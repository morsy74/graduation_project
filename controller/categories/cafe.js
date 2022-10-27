const {Cafe , validateCafe}= require('../../models/categories/cafe');
const {User}= require('../../models/user/user');
const _ = require('lodash');

exports.creatCafe=async function (req,res,next){
    const{error}= validateCafe(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let cafe = await Cafe.findOne({name: req.body.name});//,lng:req.body.lng,lat:req.body.lat
    if(cafe) return res.status(400).send("this cafe already in data base");
    cafe = await new Cafe(_.pick(req.body,['name','address','pic','menu','rate','workTime','city','cuisineType','lat','lng']));
    cafe = await cafe.save();
    res.send(cafe);
    next(); 
}

exports.getCafe= async function(req,res,next){

    let filter = {};
    if(req.query.rate){
        filter = {rate: req.query.rate };
    }
    
    const cafe = await Cafe.find(filter).populate('city','name -_id').select("-comment -review");
    res.status(200).json({
    "status": true,
    "message": "success",
    "data": cafe
  });
    next();
}

exports.getCafeById= async function(req,res,next){
    const cafe = await Cafe.findById(req.params.id).populate('city','name -_id').select("-comment -review");
    if(!cafe) return res.status(404).send('Not found check your id ');
    res.status(200).json({
    "status": true,
    "message": "success",
    "data": cafe
  });
    next();
}

exports.getCafeByCityId = async function (req, res, next) {
    const cafe = await Cafe.find({ city: req.params.cityId }).select('-city -comment -review');
    if (!cafe) return res.status(404).send('Not found check your id ');
    res.status(200).json({
    "status": true,
    "message": "success",
    "data": cafe
  });
    next();
}

exports.updateCafe= async function(req,res){
    let cafe= await Cafe.findById(req.params.id);
    if(!cafe)return res.status(404).send('not found check your id ');
    
    const {error}= validateCafe(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    cafe = await Cafe.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            rate:req.body.rate,
            cuisineType:req.body.cuisineType,
            workTime:req.body.workTime,
            pic:req.body.pic,
            menu:req.body.menu,
            lat:req.body.lat,
            lng:req.body.lng,
            city:req.body.city
        }
    }, {new : true})

    cafe = await cafe.save();
    res.send(cafe);
}


exports.deleteCafe = async function(req,res,next){
    const cafe = await Cafe.findByIdAndRemove(req.params.id);
    if(!cafe) return res.status(404).send('not found check id');
    res.send(cafe);
    next();
}

exports.addComment = async (req,res, next) => {
    const cafe = await Cafe.findById(req.params.cafeId);
    const user = await User.findOne({_id:req.body.userId});

    console.log(user);
    let  userName = function(){
        let localName = user.local.name;
        if (localName == null) return user.google.name;
        else return localName
    }
    
    let comment = cafe.comment;
    comment.push({
        "name": userName(),
        "text": req.body.text
    })

    await cafe.save();
    // res.send(comment);

    res.status(200).json({
        "status": true,
        "message": "Your comment is sent successfully",
        "data": comment
    });
}

exports.getCafeComments = async (req, res, next) => {
    const cafe = await Cafe.findById(req.params.cafeId);
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": cafe.comment
    });
}

exports.addCafeReview= async(req,res,next)=>{
    const user = await User.findById(req.body.userId);
    if(!user)return res.send("can't send review must login");
    const cafe = await Cafe.findById(req.params.id);
    const review = cafe.review;
    
   let result= review.find((rev)=> rev.UserId==req.body.userId )
   if(result){
   console.log(result);
   return res.send("you are already reviewed ")
}else{

    let userName = function () {
        let localName = user.local.name;
        if (localName == null) return user.google.name;
        else return localName
    }

       review.push({
            "UserId": req.body.userId,
            "rate": req.body.rate,   
       })

       cafe.rate= review.reduce((total, num) => {
        return  rating = Math.round((total + (num.rate / review.length))*10)/10;
        //if(rating>5)return rating=5;

    },0);
    console.log(cafe.rate);
   
       await cafe.save();
   }


   res.status(200).json({
        "status": true,
        "message": "Rate is submitted",
    })


}