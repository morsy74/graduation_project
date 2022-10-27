const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Bus } = require('../models/categories/bus');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
const { Train } = require('../models/categories/train');


exports.nearby = async (req, res, next) => {

    let lteLng = parseFloat(req.query.lng) + 0.015;
    let lteLat = parseFloat(req.query.lat) + 0.015;
    let gteLng = parseFloat(req.query.lng) - 0.015;
    let gteLat = parseFloat(req.query.lat) - 0.015;


    const Restaurants = await Restaurant
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const Cafes = await Cafe
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const BusStation = await Bus
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const TrainStation = await Train
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const Hotels = await Hotel
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const TouristPlace = await Tourist
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

    const club = await Club
        .find({ lng: { $gte: gteLng, $lte: lteLng }, lat: { $gte: gteLat, $lte: lteLat } })
        .populate('city', 'name -_id')
        .select("-comment -review");

        let result = {
            Restaurants,
            Cafes,
            Hotels,
            club,
            TouristPlace,
            TrainStation,
            BusStation
        }


    return res.status(200).json({
        "status": true,
        "message": "success",
        "data": result
    });

    next();
};
