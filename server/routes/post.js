const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')


router.post('/createpost',requireLogin,(req,res) =>{
    const {title,amount,hospitalName,hospitalPhoneNumber, hospitalAddress,descAboutPatientHealth,patientPhoneNumber} = req.body
    if(!title || !amount || !hospitalName || !hospitalPhoneNumber || !hospitalAddress || !descAboutPatientHealth || !patientPhoneNumber ){
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
        postedBy:req.user   //=> to know who put this post 
    })
    post.save().then(result =>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

module.exports = router