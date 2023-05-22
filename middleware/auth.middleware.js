const jwt = require("jsonwebtoken")
require("dotenv").config()
const {blacklist}=require("../blacklist")


const auth = async(req,res,next)=>{
    try{
        let token = req?.headers?.authorization;
        if (!token){
            return res.status(4011).json({msg:"authorization token is not present"})
        }
        token = req.headers.authorization.split(' ')[1]

        //checking the token for blacklisting

        if (blacklist.includes(token)){
            return res.status(401).json({msg:"not authorized"})
        }
        const validtoken = await jwt.verify(toekn,process.env.secretkey)
        if (!validtoken){
            return res.status(401).json({msg:"not authorized"})
        }
           req.body.userId = validtoken.userId

           next()
    }
    catch(err){
        res.status(401).json({msg:'wrong credentials'})
    }
}


module.exports={
    auth
}