const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ','');

    if(!token)
    {
        return res.status(401).send('Access Denied')
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next()
    }catch(error){
        res.status(400).send('Invalid Token')
    }
}

module.exports = authenticateJWT