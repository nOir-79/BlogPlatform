require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authenticationRouter = require('./routes/authenticationRoutes')
const postRouter = require('./routes/postRoutes')

app.use(express.json())
mongoose.connect("mongodb://localhost/blogPlatform")



app.use('/authentication',authenticationRouter)
app.use('/post',postRouter)
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(8000)