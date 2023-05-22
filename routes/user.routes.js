const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const {User}=require("../model/user.model")
const { auth } = require("../middleware/auth.middleware")
const { blacklist } = require("../blacklist")



const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    try{
         const payload = req.body
         const user = await User.findOne({email:payload.email})
         if (user){
            return res.status(201).send({msg:'user already exist , please login again'})
         }else{
            const hashpassword = await bcrypt.hashSync(payload.password,7)
            payload.password = hashpassword
            const newUser = new User  (payload)
            await newUser.save()
            return res.status(201).send({msg:"signup sucessfully✌️",user:newUser})
         }

    }
    catch(err){
        res.status(401).send({msg:"error"})
    }
})

userRouter.post("/login", async(req,res)=>{
    try {
       const payload = req.body;
       const user =  await User.findOne({email:payload.email});
       if(!User){
        return res.send("Please signup again")
       }
       const truepass = await bcrypt.compareSync( payload.password,user.password);
       if(truepass){
        const token = await jwt.sign({ email:user.email,userId:user._id}, process.env.secretKey, { expiresIn: '1min' });
        // refresh token genrated
        const refreshtoken = await jwt.sign({ email:user.email,userId:user._id}, process.env.refreshtoken, { expiresIn: '5min' });
        res.json({msg:"Login Sucessfully ✅",token, refreshtoken})
       }
       else{
        res.status(200).send({msg:"Invalid data"})
       }
    } 
    catch (err) {
        res.status(500).send({msg:err.message});
    }
})

userRouter.get("/logout",auth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    blacklist.push(token)
    console.log(token)
    res.status(201).send({msg:"logout sucessfully"})
})




module.exports = {
    userRouter
}