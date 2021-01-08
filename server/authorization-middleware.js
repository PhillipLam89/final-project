const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    throw new ClientError(401, 'AUTHENTICATION REQUIRED');
  }
  req.user = jwt.verify(accessToken, process.env.TOKEN_SECRET);

  next();
}

module.exports = authorizationMiddleware;
