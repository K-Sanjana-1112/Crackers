const jwt=require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    // get token from req
    let bearertoken=req.headers.authorization;
   
    if(bearertoken){
        let token=bearertoken.split(' ')[1]
        let decodedtoken=jwt.verify(token,process.env.SECRET_KEY)
        console.log(token)
        next()
    }else{
        res.send({message:"Unauthorized access"})
    }
    
    



}

module.exports=verifyToken;