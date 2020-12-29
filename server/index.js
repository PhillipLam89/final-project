require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');

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
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.get('/api/search/list/:cityId/:ratingFilter', (req, res, next) => {
  const cityId = req.params.cityId;
  const ratingFilter = req.params.ratingFilter;
  fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&starRatings=${ratingFilter}&locale=en_US&sortOrder=PRICE`, {
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
