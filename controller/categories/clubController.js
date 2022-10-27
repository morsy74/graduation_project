const Joi = require("joi");
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Club, validate } = require('../../models/categories/club');
const {User}= require('../../models/user/user');

exports.showAllClubs = async (req, res, next) => {
  const club = await Club
  .find()
  .sort('name')
  .populate("city"," name -_id")
  .select("-comment -review");
  
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": club
  });
  next();
}

exports.getClubById = async function (req, res, next) {
  const club = await Club.findById(req.params.id).populate("city","name -_id").select("-comment -review");
  if (!club) return res.status(404).send("Not found check your id ");
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": club
  });
  next();
};

exports.getClubByCityId = async function (req, res, next) {
  const club = await Club.find({ city: req.params.cityId }).select('-city -comment -review');
  if (!club) return res.status(404).send('Not found check your id ');
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": club
  });
  next();
}

exports.addClub = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let club = new Club(_.pick(req.body,
    ['name', 'address', 'workTime', 'price', 'rate', 'pic', 'lat', 'lng', 'city']));
  
    await club.save();
    res.send(club)
    next();
};

exports.editClub = async (req, res, next) =>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const club = await Club.findByIdAndUpdate(req.params.id, {
   $set:{
    name: req.body.name,
    address: req.body.address,
    workTime: req.body.workTime,
    price: req.body.price,
    pic: req.body.pic,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city
  }
  }, {new: true});

  if (!club) return res.status(404).send("The club with the given ID is not found!..");
  res.send(club);
  next();
};

exports.deleteClub = async (req, res, next) => {
  const club = await Club.findByIdAndRemove(req.params.id);

  if (!club) return res.status(404).send('The club with the given ID was not found.');
  res.send(club);
  next();
};

exports.addComment = async (req,res, next) => {
  const club = await Club.findById(req.params.clubId);
  const user = await User.findOne({_id:req.body.userId});

  console.log(user);
  let  userName = function(){
      let localName = user.local.name;
      if (localName == null) return user.google.name;
      else return localName
  }
  
  let comment = club.comment;
  comment.push({
      "name": userName(),
      "text": req.body.text
  })

  await club.save();
  // res.send(comment);

  res.status(200).json({
      "status": true,
      "message": "Your comment is sent successfully",
      "data": comment
  });
}

exports.getClubComments = async (req, res, next) => {
  const club = await Club.findById(req.params.clubId);
  res.status(200).json({
      "status": true,
      "message": "success",
      "data": club.comment
  });
}



exports.addClubReview= async(req,res,next)=>{
  const user = await User.findById(req.body.userId);
  if(!user)return res.send("can't send review must login");
  const club = await Club.findById(req.params.id);
  const review = club.review;
  
 let result= review.find((rev)=> rev.UserId==req.body.userId )
 if(result)return res.send("you are already reviewed ")
 else{

  let userName = function () {
      let localName = user.local.name;
      if (localName == null) return user.google.name;
      else return localName
  }

     review.push({
          "UserId": req.body.userId,
          "rate": req.body.rate,   
     })

     club.rate= review.reduce((total, num) => {
      return  rating = Math.round((total + (num.rate / review.length))*10)/10;
      //if(rating>5)return rating=5;

  },0);
  console.log(club.rate);
 
     await club.save();
 }


 res.status(200).json({
  "status": true,
  "message": "Rate is submitted"
})


}