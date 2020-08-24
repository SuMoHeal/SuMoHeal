
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
// mongoose.connect("mongodb://localhost/collection");

// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("connection has been made");
//   });
// db.on("error", (error) => {
//     console.log("Connection error:", error);
//   });

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    },
    hospitalPhoneNumber:{
        type:Number,
        required:true
    },
    hospitalAddress:{
         type:String,
         required:true
    },
    descAboutPatientHealth:{
        type:String,
        required:true
    },
    patientPhoneNumber:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    //building relation with User Schema in mongoodb
    postedBy:{
        type:ObjectId,
        ref:'User'
    }
})

mongoose.model("Post",postSchema)