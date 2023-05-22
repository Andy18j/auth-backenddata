const express = require("express")
const {product}=require("../model/product.model")
const productRouter = express.Router()


productRouter.post('/addproducts',async(req,res)=>{
    try {
        const data = req.body;
        const newPost =  new product(data);
        await newPost.save();
        console.log(newPost)
        res.send({msg:"product added successfuly.."})
    } 
    catch (err) {
        res.status(500).send(err.message);   
    }
});


productRouter.get("/products",async(req,res)=>{
    try {
        const {userId}= req.body;
        const post = await product.find({$and:[{userId}]});
        console.log(post)
        res.status(200).json({post, msg:"Your products"});    
    } 
    catch (err) {
        res.status(500).send(err.message);
    }
});

productRouter.delete("/deleteproducts/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const deletePost = await Post.findByIdAndDelete(id);
        if(deletePost){
            res.send({msg:"Post deleted successfully.."})
        }
        else{
            res.send({msg:"Not found Post"})
        }    
    } 
    catch (error) {
        res.status(500).send(err.message);
    }
});



module.exports = {
    productRouter
}