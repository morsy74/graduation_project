const { Support, validate} = require('../models/support');
const {User} = require('../models/user/user');
const _ = require('lodash');

exports.sendProblem = async (req, res, next) => {
  const {error} = validate(req.body);
  if (error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  })

  let user = await User.findOne({"local.email": req.body.email});
  let user1 = await User.findOne({"google.email": req.body.email});
  if (!user || !user1) return res.status(200).json({
    "status": false,
    "message": "you must be logged in first"
  });

  let support = new Support(_.pick(req.body, ['name', 'email', 'message']));

  await support.save();
  res.status(200).json({
    "status": true,
    "message": "Your problem was saved successfully"
  })

  next();
}

exports.getSupportMessages = async (req, res, next) => {
  const support = await Support.find();
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": support
  })
}