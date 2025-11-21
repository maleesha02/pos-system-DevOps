const jwt = require('jsonwebtoken');

const authMiddleware = (req, resp, next)=>{
    try {
       const authHeader = req.headers['authorization'];
        console.log(authHeader);
       if(!authHeader){
           return resp.status(401).json({message:'authentication header is missing...'});
       }
       const token = authHeader.split(" ")[1];

        if(!token){
            return resp.status(401).json({message:'token is missing...'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email;
        next();

    } catch (e) {
        resp.status(401).json({'message':'invalid or expired token'});
    }
}
module.exports=authMiddleware;