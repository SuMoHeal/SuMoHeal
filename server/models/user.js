const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName :{
        type: String,
        required: true,
    },
    phoneNumber:{ 
      type: Number,
      required: true
    },
    email :{
       type:String,
       required: true,
       unique: true
    },
    password :{
        type:String,
        required: true
    }
    

})

mongoose.model('User',userSchema)