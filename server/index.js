
require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');
const db = require('./db');
const app = express();
app.get('/api/search/:userInput', (req, res, next) => {
  const userInput = req.params.userInput;
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
      return fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&starRatings=5&locale=en_US&sortOrder=PRICE`, {
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
  const hotelId = req.params.hotelId;
  const userId = req.params.userId;
  const sql = `
    insert into "favorites" ("hotelId","userId")
    values ($1, $2)
    returning *
  `;
  const params = [hotelId, userId];
  db.query(sql, params)
    .then(result => {
      const [fav] = result.rows;
      res.status(201).json(fav);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
