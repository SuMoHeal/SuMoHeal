const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const {MONGOURL} = require('./config/keys')


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

require ('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

//if the application deployad then do this 
if(process.env.NODE_ENV=="production"){
   app.use(express.static('client/build'))
   const path = require('path')    //=>require the path module
   app.get("*",(req,res)=>{   //=> if the client make any req we will be send the index.html first 
       res.sendFile(path.resolve(_dirname,'client','build','index.html'))  //=>that is in the build folder which contain the react code
   })
}

app.listen(PORT,()=>{
    console.log('server is running on',PORT)
})