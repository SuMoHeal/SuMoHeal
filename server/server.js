const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 5000
const {MONGOURL} = require('./keys')
require ('./models/user')

mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


app.listen(PORT,()=>{
    console.log('server is running on',PORT)
})