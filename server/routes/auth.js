const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")


//saving data to mongo database & testing that on postman
router.post('/signup',(req,res)=>{
    const {name,email,password,phoneNumber} = req.body
    if(!email || !password || !name || !phoneNumber){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
          return  res.status(422).json({error:"user already exists with that email"})
        }
       //hashing the password so no one can take it even from our website
      //(12)the bigger number will be the more security the password is
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
        const user = new User({
            email,
            password : hashedpassword,
            name,
            phoneNumber
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
})

module.exports = router