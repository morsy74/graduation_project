const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logging = require('../middleware/logger');
const register = require('../routes/user/register');
const login = require('../routes/user/login');
const forgotPassword = require('../routes/user/forgotPassword');
const resetPassword = require('../routes/user/resetPassword');
const changePassword = require('../routes/user/changePassword');
const profile = require('../routes/profile');
const city = require("../routes/categories/city");
const restaurant = require('../routes/categories/restaurant');
const cafe = require('../routes/categories/cafe');
const clubs = require('../routes/categories/club');
const hotels = require('../routes/categories/hotel');
const touristPlaces = require('../routes/categories/tourist-place')
const train=require('../routes/categories/train');
const bus=require('../routes/categories/bus');
const wishlist= require('../routes/wishlist');
const home = require('../routes/home');
const search = require('../routes/search');
const nearby = require('../routes/nearby');
const support = require('../routes/support');

module.exports = function(app){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(express.json());
  app.use(helmet());
  app.use('/api/user', register);
  app.use('/api/user/register', register);
  app.use('/api/user/login', login);
  app.use("/api/user", forgotPassword);
  app.use("/api/user", resetPassword);
  app.use("/api/user", changePassword);
  app.use("/api/user", profile);
  app.use('/api/clubs', clubs);
  app.use('/api/hotels', hotels);
  app.use('/api/tourist', touristPlaces);
  app.use("/api/city",city);
  app.use("/api/restaurant",restaurant);
  app.use('/api/cafe',cafe);
  app.use("/api/train",train);
  app.use("/api/bus",bus);
  app.use("/api/user",wishlist);
  app.use("/api/home",home);
  app.use("/api/search",search);
  app.use("/api/nearby",nearby);
  app.use("/api/support", support);

  if (app.get('env') === 'development') {
    app.use(logging);
    app.use(morgan('tiny'));
  }
}