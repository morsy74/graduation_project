const { User } = require('../models/user/user');

exports.profile = async (req, res, next) => {
  const token = req.header('Authorization');
  let user = await User.findOne({"local.token": token});
  if (!user) return res.status(200).json({
    "status": false,
    "message": "you must be registered or login",
    "data": null
  });
  const userBack = {
    "id": user.id,
    "name": user.local.name,
    "email": user.local.email,
    "token": user.local.token
  };


  res.status(200).json({
    "status": true,
    "message": `Welcome ${user.local.name}` ,
    "data": userBack
  });
  
  next();
}