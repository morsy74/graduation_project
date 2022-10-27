const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Support = mongoose.model('Support', supportSchema);

function validateSupport(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required()
  }); 
  return schema.validate(user);
}


exports.Support = Support
exports.validate = validateSupport
