const authorizeRoles = (roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send('You do not have permission to perform this operation')
        }
        next();
    }
}

module.exports = authorizeRoles