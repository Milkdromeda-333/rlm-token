const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

// Signup
authRouter.post("api/signup", (req, res, next) => {
  console.log("ran");
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error("That username is already taken"));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser.withoutPassword() });
    });
  });
});

// Login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, savedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!savedUser) {
      res.status(403);
      return next(new Error("Username or Password are incorrect"));
    }

    // calls schema.method set in the model.
    savedUser.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403);
        return next(new Error("Username or Password is incorrect."));
      }
      if (!isMatch) {
        res.status(403);
        return next(new Error("Username or Password is incorrect."));
      }

      // creates a token to authenticate user
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);

      // sends token as a response to the frontend, where the client can save for authentication.
      return res.status(200).send({ token, user: savedUser.withoutPassword() });
    });
  });
});


module.exports = authRouter;