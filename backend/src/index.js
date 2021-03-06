const cookieParser = require('cookie-parser');
require('dotenv').config({
  path: 'variables.env'
});
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// Use express middlware to handle cookies (JWT)
server.express.use(cookieParser());

// decode the JWT so we can get t he user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //put the userId on to rhe request for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the users on each request

server.express.use(async (req, res, next) => {
  // If they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{id, permissions, email, name}'
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
