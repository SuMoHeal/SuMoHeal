const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')
const User = mongoose.model('User')
var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'hammamiamneh7@gmail.com',
//       pass: 'AmnehHammami'
//     }
//   });
// var obj={}
// var obj2={email:''}

// router.post('/send',(req,res)=>{
//     var bill = {amount:900,hospitalName:'lol0'}
//     var bill2 = {amount:0,hospitalName:'youmna'}
//    var payment=req.body.payment
//    var selected=req.body.selected
//    var feed=req.body.feed
//    var id=req.body.id
//         User.findOne({id:id}).then(function(result){
//         console.log("Amneh "+result)
//                 var mailOptions = {
//                     from: 'hammamiamneh7@gmail.com',
//                     to:obj2.email,
//                     subject: 'Sending Email using Node.js',
//                     text:'someone will pay for you '+payment+' $'+' and the way of payment is '+selected
//                   };
//                   //
//                   transporter.sendMail(mailOptions, function(error, info){
//                     if (error) {
//                       console.log(error);
//                     } else {
//                       console.log('Email sent: ' + info.response);
//                     }
//                });
//         res.send('Amneh send: ')
//         })
//    })

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    //i want everything exept password
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true,
    },(err,result)=>{
     if(err){
         return res.status(422).json({error:err})
     }
     User.findByIdAndUpdate(req.user._id,{
         $push:{following:req.body.followId}
     },
     { new:true }).select("-password").then(result=>{
         res.json(result)
     }).catch(err=>{
         return res.status(422).json({error:err})
     })

    }
    )
})

router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true,
    },(err,result)=>{
     if(err){
         return res.status(422).json({error:err})
     }
     User.findByIdAndUpdate(req.user._id,{
         $pull:{following:req.body.unfollowId}
     },
     { new:true }).select("-password").then(result=>{
         res.json(result)
     }).catch(err=>{
         return res.status(422).json({error:err})
     })
     
    }
    )
})

module.exports = router