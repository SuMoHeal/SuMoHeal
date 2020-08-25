const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name")
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

module.exports = router