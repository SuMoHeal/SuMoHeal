const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name :{
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
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/sarabelia/image/upload/v1598590419/146-1468479_my-profile-icon-blank-profile-picture-circle-hd_uzg3lj.png"
    },
    followers:[{
    type:ObjectId,
    ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]

})

mongoose.model('User',userSchema)