const mongoose = require('mongoose');
const Joi = require('joi');

reviewSchema=mongoose.Schema({

    rate: Number,
    date: { type: Date , default: Date.now },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


cafeSchema= mongoose.Schema({
    name:String,
    address:String,
    rate: {
        type: Number,
        default:0
      },
    workTime:String,
    pic:[String],
    menu:[String],
    lat:Number,
    lng:Number,
    comment : [Object],
    review:[reviewSchema],
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
})

cafeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
  });

const Cafe = mongoose.model('Cafes',cafeSchema);

function validateCafe(cafe){

    const schema= Joi.object({
        name:Joi.string().min(3).max(100).required(),
        address:Joi.string().min(3).required(),
        rate:Joi.required(),
        pic:Joi.required(),
        menu:Joi.required(),
        workTime:Joi.string().min(7).max(10).required(),
        lat:Joi.number().required(),
        lng:Joi.number().required(),
        city:Joi.required()
    });

    return schema.validate(cafe);
}

module.exports.Cafe=Cafe;
module.exports.validateCafe=validateCafe;