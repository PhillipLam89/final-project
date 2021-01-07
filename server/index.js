
require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');
const db = require('./db');
const app = express();
app.get('/api/search/:userInput/:ratingFilter', (req, res, next) => {
  const {userInput, ratingFilter} = req.params
  fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${userInput}&locale=en_US`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${process.env.API_KEY}`,
      'x-rapidapi-host': 'hotels4.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      const cityId = data.suggestions[0].entities[0].destinationId;
      return fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&starRatings=${ratingFilter}&locale=en_US&sortOrder=PRICE`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${process.env.API_KEY}`,
          'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      })
        .then(response => response.json())
        .then(data => res.json(data.data.body.searchResults.results));
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/hotels/:hotelId', (req, res, next) => {
  const hotelId = req.params.hotelId;
  fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${hotelId}&locale=en_US&currency=USD&checkOut=2020-01-15&adults1=1&checkIn=2020-01-08`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${process.env.API_KEY}`,
      'x-rapidapi-host': 'hotels4.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.post('/api/favorites/:userId/:hotelId', (req, res, next) => {
  const {userId, hotelId} = req.params

  let hotelName = ''
        //gets name of hotel from ID
  fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${hotelId}&locale=en_US&currency=USD&checkOut=2020-01-15&adults1=1&checkIn=2020-01-08`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${process.env.API_KEY}`,
      'x-rapidapi-host': 'hotels4.p.rapidapi.com'
     }
   })
    .then(response => response.json())
    .then(data => {
      hotelName = data.data.body.propertyDescription.name
      const sql = `
        insert into "favorites" ("hotelId","userId","hotelName")
        values ($1, $2, $3)
        returning *
      `;
      const params = [hotelId, userId, hotelName];
      return db.query(sql, params)
        .then(result => {
          const [fav] = result.rows;
          res.json(fav);
        })
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/:userId/favorites', (req, res, next) => {
  const {userId} = req.params

  const sql = `
        select "hotelName", "hotelId" from "favorites"
      `;
  return db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });

});
app.delete('/api/:userId/:hotelId', (req, res, next) => {
  const {userInput, hotelId} = req.params
  const sql = `
        delete from "favorites"
        where "hotelId" = ${hotelId}
      `;
  return db.query(sql)
    .then(result => {
      res.json(result.rows)
      res.status(200)
    })
    .catch(err => {
      next(err);
    });

});


app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
