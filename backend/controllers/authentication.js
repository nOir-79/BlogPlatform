const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res)=>{
    const {fullname,username,password,email,role} = req.body
    try{
        const user = new User({
            fullname: fullname,
            username: username, 
            password: password,
            email: email,
            role:role
        })
        await user.save()
        res.status(201).send({user})

    }catch(e)
    {
        console.log(e)
        res.status(500).send('Error registering User')
    }

}

exports.login = async (req, res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})

        if(!user || !await bcrypt.compare(password, user.password))
        {
            return res.status(401).send('Invalid Credentials')
        }

        const token = jwt.sign({user:user},process.env.JWT_SECRET_KEY)
        res.json({token})
    }catch(error)
    {
        console.error(err)
        res.status(500).send('Error logging in')
    }
}

exports.getUserInfo = async(req, res)=>{
    try{
        console.log('I am here')
        const username = req.params.username
        console.log(username)
        const user = await User.findOne({username:username})
        console.log(user)
        if(!user)
            return res.status(404).send('No user with the username')
        return res.status(200).send(user)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}