const express = require("express")
// const { connect } = require("http2")
// const { connection } = require("mongoose")
const {auth}= require("./middleware/auth.middleware")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.routes")
const {productRouter}=require("./routes/product.routes")
require("dotenv").config()
const app  = express()
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("home page")
})
app.use("/users",userRouter)
app.use("/data",auth,productRouter)
app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("connected to the db")
    }
    catch(err){
        console.log("not connected to the db")
    }
    console.log(`port is running at the ${process.env.port}`)
})

