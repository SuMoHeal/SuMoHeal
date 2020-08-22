const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middleware/requirelogin")

// we created the middleware to confirm the user token 
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})
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

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       res.status(422).json({error:'please add email or password '}) 
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
         return  res.status(422).json({error:"Invalid email or password"})
        }
        //comparing the password that the user put it with the password stored in our data base
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                //if the user successed in signing in => we shoud give him a token so he can access to our protected resources
                //with this given token 
                //if the user want to access any of our protected resources => he should enter with the token that we give it to him 
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                //we put the same error cause we dont want to give the 
                //hackers hint that the email or the password are correct
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router