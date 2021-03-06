
require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser')
const ClientError = require('./client-error');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken'); // eslint-disable-line
const staticMiddleware = require('./static-middleware');
const cors = require('cors');
app.use(staticMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.options('*', cors())

app.post('/api/sign-up', (req, res, next) => {
  const { username, password, fullName } = req.body;
  if (username.length < 5 || password.length <5 ) {
    throw new ClientError(400, 'user name and password MUST be 5 or more characters long');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "UserInfo" ("fullName", "userName", "password")
        values ($1, $2, $3)
        returning "userId"
      `;
      const params = [fullName, username, hashedPassword];
      return db.query(sql, params)
        .then(result => {
          const [userId] = result.rows;
          res.status(201).json(userId);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/auth/login', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
    select "userId",
           "password"
      from "UserInfo"
     where "userName" = $1
  `
  const params = [userName];
  return db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(401, 'invalid login');
      }
      const hashedPw = result.rows[0].password;
      argon2.verify(hashedPw, password)
        .then(passwordMatched => {
          if (!passwordMatched) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            userId: result.rows[0].userId,
            userName: userName
          };
          res.status(200).json({
            token: jwt.sign(payload, process.env.TOKEN_SECRET),
            userName: payload
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
})



app.get('/api/search/:userInput/:ratingFilter', (req, res, next) => {
  const { userInput, ratingFilter } = req.params
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


app.get('/api/hotels/:hotelId/photos', (req, res, next) => {
  const hotelId = req.params.hotelId;
  fetch(`https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${hotelId}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": `${process.env.API_KEY}`,
      "x-rapidapi-host": "hotels4.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});


app.get('/api/:userId/favorites', (req, res, next) => {
  const { userId } = req.params

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
  const { hotelId } = req.params
  const sql = `
        delete from "favorites"
        where "hotelId" = $1
      `;
  const params = [hotelId]
  return db.query(sql, params)
    .then(result => {
      const [deleted] = result.rows
      res.json(deleted)
      res.status(204)
    })
    .catch(err => {
      next(err);
    });

});


app.delete(`/api/:userId/reviews/remove/:hotelId`, (req, res, next) => {
  const { userId, hotelId } = req.params
  const sql = `
        delete from "reviews"
        where "reviewId" = $1
      `;
  const params = [hotelId]
  return db.query(sql, params)
    .then(result => {
      const [deleted] = result.rows
      res.json(deleted)
      res.status(204)
    })
    .catch(err => {
      next(err);
    });

});
app.post('/api/favorites/:userId/', (req, res, next) => {
  const { userId } = req.params
  const { hotelId, hotelName } = req.body
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
    .catch(err => {
      next(err);
    });
});


app.get('/api/reviews/:hotelId', (req, res, next) => {
  const { hotelId } = req.params
  fetch(`https://hotels-com-free.p.rapidapi.com/mobile_service/property-content/v1/hotels.com/property/${hotelId}/reviews?loc=en_US&page=1`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": `${process.env.API_KEY}`,
      "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => {
      res.json(data.reviewData.guestReviewGroups.guestReviews[0].reviews)
    })
    .catch(error => {
      console.error('Error:', error);
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

app.get('/api/weather/:latitude/:longitude', (req, res, next) => {
  const {latitude, longitude} = req.params
  fetch(`https://dark-sky.p.rapidapi.com/${latitude},${longitude}?lang=en&units=auto`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": `${process.env.API_KEY}`,
      "x-rapidapi-host": "dark-sky.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});


app.get(`/api/coordinates/:latitude/:longitude`, (req, res, next) => {
  const { latitude, longitude } = req.params
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${process.env.Google_Geolocation_API_Key}`
)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});



app.post('/api/favorites/:userId/', (req, res, next) => {
  const { userId } = req.params
  const { hotelId, hotelName } = req.body
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
    .catch(err => {
      next(err);
    });
});

                //POSTs and adds user review to DB
app.post('/api/write/review/:userId/:hotelName', (req, res, next) => {
  const {userId, hotelName} = req.params
  const { cleanliness, service, foodAndEntertainment, content, dateWritten, timeWritten, hotelId } = req.body;


  const sql = `
        insert into "reviews" ("hotelName","userId","cleanliness", "service", "foodAndEntertainment", "content", "dateWritten", "timeWritten", "hotelId")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *
      `;
  const params = [hotelName, userId, cleanliness, service, foodAndEntertainment, content, dateWritten, timeWritten, hotelId];
  return db.query(sql, params)
    .then(result => {
      const [myReview] = result.rows;
      res.json(myReview);
    })
    .catch(err => {
      next(err);
    });


});
            // GETs current saved reviews from DB, when see-review page loads
app.get('/api/:userId/myreviews/', (req, res, next) => {
  const { userId} = req.params

  const sql = `
        select "hotelName", "cleanliness", "service", "foodAndEntertainment", "content", "dateWritten", "timeWritten", "hotelId", "reviewId" from "reviews"
      `;
  return db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });

});

     //EDITS review
app.patch('/api/:userId/myreviews/edit/:reviewId', (req, res, next) => {
  console.log('req body', req.body)
  const { userId, reviewId } = req.params
  const { newCleanlinessRating, newServiceRating, newFoodAndEntertainment, updatedContent, dateUpdated, timeUpdated } = req.body;
  const sql = `
        update "reviews"
        set "cleanliness" = ${newCleanlinessRating}, "service" = ${newServiceRating}, "foodAndEntertainment" = ${newFoodAndEntertainment}, "content" = ${updatedContent}
        where "reviewId" = ${reviewId}
        returning *
      `;

  return db.query(sql)
    .then(result => {
      res.json(result.rows);
      console.log('rows', result.rows)
    })
    .catch(err => {
      next(err);
    });

});




app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
