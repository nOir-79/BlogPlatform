require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authenticationRouter = require('./routes/authenticationRoutes')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')

app.use(express.json())
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogPlatform'
mongoose.connect(mongoURI)



app.use('/authentication',authenticationRouter)
app.use('/post',postRouter)
app.use('/comments',commentRouter)
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(8000)