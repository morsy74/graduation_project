const express = require('express');
const router = express.Router();
const touristController = require('../../controller/categories/touristController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addTouristPlace', touristController.addTourist);
router.put('/editTouristPlace/:id', auth, touristController.editTourist);
router.delete('/deleteTouristPlace/:id', [auth, admin], touristController.deleteTourist);
router.get('/getAllTouristPlaces', touristController.showAllTourists);
router.get('/getTouristById/:id', touristController.getTouristById);
router.get('/city/:cityId', touristController.getTouristByCityId);
router.post('/:touristId',touristController.addComment);
router.get('/comments/:touristId',touristController.getTouristComments);
router.post('/review/:id',touristController.addTouristReview);

module.exports = router;