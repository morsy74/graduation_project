const express = require('express');
const route = express.Router();
const wishlist= require('../controller/wishlist');

route.post('/wishlist/Restaurant/:id', wishlist.addRestaurantToWishlist); 
route.post('/wishlist/Cafes/:id', wishlist.addCafeToWishlist); 
route.post('/wishlist/Bus/:id', wishlist.addBusToWishlist); 
route.post('/wishlist/City/:id', wishlist.addCityToWishlist);
route.post('/wishlist/Club/:id', wishlist.addClubToWishlist);
route.post('/wishlist/Hotel/:id', wishlist.addHotelToWishlist); 
route.post('/wishlist/TouristPlace/:id', wishlist.addTouristPlaceToWishlist); 
route.post('/wishlist/Train/:id', wishlist.addTrainToWishlist); 
route.delete('/deleteWishList', wishlist.deleteFromWishlist); 

route.get('/wishlist/:id', wishlist.getWishlist); 

module.exports=route;