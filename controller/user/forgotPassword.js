const { User } = require("../../models/user/user");
const { Token } = require("../../models/user/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");

exports.forgotPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if(error) return res.status(200).json({
      "status": false,
      "message": error.details[0].message,
    });

    const user = await User.findOne({ "local.email": req.body.email });
    if (!user)
      return res.status(400).json({
        "status": false,
        "message": "user with given email doesn't exist",
        "data": null
      });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomInt(100000, 999999)
      }).save();
    }

    const code = token.token;
    await sendEmail(
      user.local.email,
      "Password reset",
      `This is Your private code to reset your password: ${code}`,
      user.local.name
      );

      res.json({
        status: true,
        message: "Verify code is sent to your email account and code it will deleted after 45 seconds",
      });
    let duration = 45 * 1000; 
    setTimeout(async () => {
      await token.delete();
    }, duration);

  } catch (error) {
    console.log(error);
  }

  next();
};

