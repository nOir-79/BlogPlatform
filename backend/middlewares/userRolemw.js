const User = require('../models/user')
const authorizeRoles = (roles)=>{
    console.log(roles)
    return async (req, res, next)=>{
        console.log(req.body.author)
        const author = req.body.author
        const user = await User.findById(author)
        console.log(user)
        const role = user.role
        if(!roles.includes(role)){
            return res.status(403).send('You do not have permission to perform this operation')
        }
        next();
    }
}

module.exports = authorizeRoles