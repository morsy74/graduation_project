const express = require('express');
const router = express.Router();
const clubController = require('../../controller/categories/clubController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addClub', clubController.addClub);
router.put('/editClub/:id', auth, clubController.editClub);
router.delete('/deleteClub/:id', [auth, admin], clubController.deleteClub);
router.get('/getAllClubs', clubController.showAllClubs);
router.get('/getClubById/:id', clubController.getClubById);
router.get('/city/:cityId', clubController.getClubByCityId);
router.post('/:clubId',clubController.addComment);
router.get('/comments/:clubId',clubController.getClubComments);
router.post('/review/:id',clubController.addClubReview);

module.exports = router;