const rest = require('../../controller/categories/restaurant');
const express= require('express');
const router=express.Router();
router.get('/getRestaurants',rest.getRest);
router.get('/getRestaurantById/:id',rest.getRestById);
router.get('/city/:cityId',rest.getRestByCityId);
router.post('/',rest.postRest);
router.put('/:id',rest.putRest);
router.delete('/:id',rest.deleteRest);
router.post('/:restaurantId',rest.addComment);
router.get('/comments/:restaurantId',rest.getRestaurantComments);
router.post('/review/:id',rest.addReview);
module.exports=router;
