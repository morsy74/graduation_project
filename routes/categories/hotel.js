const express = require('express');
const router = express.Router();
const hotelController = require('../../controller/categories/hotelController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addHotel', hotelController.addHotel);
router.put('/editHotel/:id', auth, hotelController.editHotel);
router.delete('/deleteHotel/:id', [auth, admin], hotelController.deleteHotel);
router.get('/getAllHotels', hotelController.showAllHotels);
router.get('/getHotelById/:id', hotelController.getHotelById);
router.get('/city/:cityId', hotelController.getHotelByCityId);
router.post('/:hotelId',hotelController.addComment);
router.get('/comments/:hotelId',hotelController.getHotelComments);
router.post('/review/:id',hotelController.addHotelReview);

module.exports = router;