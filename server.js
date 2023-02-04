const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const PORT = 9000;

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
  process.env.MONGODB_URI,
  () => console.log('Connected to the DB')
);


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })); // req.user
app.use('/api/todo', require('./routes/todoRouter.js'));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.log("runs")
    res.status(err.status);
  }
  // .message is how you get the passed in message like return next(new Error(...)) 
  return res.send({ errMsg: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on local port ${PORT}`);
});