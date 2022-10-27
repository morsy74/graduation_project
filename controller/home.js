const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
const { Train } = require('../models/categories/train');
const { Bus } = require('../models/categories/bus')
exports.getTrend = async function (req, res, next) {
     const Restaurants = await Restaurant.find({ rate: { $gte: 4.5 } }).populate('city', 'name -_id').select("-comment -review");
     const Cafes = await Cafe.find({ rate: { $gte: 4.5 } }).populate('city', 'name -_id').select("-comment -review");
     const Hotels = await Hotel.find({ rate: { $gte: 4.5 } }).populate('city', 'name -_id').select("-comment -review");
     const TouristPlace = await Tourist.find({ rate: { $gte: 4.5 } }).populate('city', 'name -_id').select("-comment -review");
     const club = await Club.find({ rate: { $gte: 4.5 } }).populate('city', 'name -_id').select("-comment -review");
     
     let home = {
          Restaurants,
          Cafes,
          Hotels,
          TouristPlace,
          club
     }
     
     res.status(200).json({
          "status": true,
          "message": "success",
          "data": home
     });
     next();
};

