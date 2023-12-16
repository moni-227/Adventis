
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

        try{
            const token = req.headers.authorization;
            const decode = jwt.verify(token,'credo_secret');
            // console.log("decode",decode);
            req.email = decode.email;
            // req.roles = decode.roles;-
            next();
        }catch(err){
            res.status(400).json({
                message:"token is invalid"

            })
        }


}