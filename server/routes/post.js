const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,amount,hospitalName,hospitalPhoneNumber, hospitalAddress,descAboutPatientHealth,patientPhoneNumber,pic} = req.body
    if(!title || !amount || !hospitalName || !hospitalPhoneNumber || !hospitalAddress || !descAboutPatientHealth || !patientPhoneNumber || !pic ){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined  //=> to not make the password appear in the postedBy
    const post = new Post({
        title,
        amount,
        hospitalName,
        hospitalPhoneNumber,
        hospitalAddress,
        descAboutPatientHealth,
        patientPhoneNumber,
        photo:pic,
        postedBy:req.user   //=> to know who put this post 
    })
    post.save().then(result =>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

// the user can see all his posts
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy',"_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/intrested',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        //pshing the user to the intreseted array 
        $push:{intrested:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unintrested',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        //pullig the user from the intreseted array 
        $pull:{intrested:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        //pshing the user to the comments array 
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports = router