const express = require('express')
const router = express.Router()

//saving data to mongo database & testing that on postman
router.post('/signup',(req,res)=>{
    const {name,email,password,phoneNumber} = req.body
    if(!email || !password || !name || !phoneNumber){
       return res.status(422).json({error:"please add all the fields"})
    }
    res.json({message:"successfuly posted"})
})

module.exports = router