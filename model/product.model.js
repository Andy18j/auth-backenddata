const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name : String,
    role :  String,
    brand : String
})

const product = mongoose.model("product",productSchema)


module.exports={
    product
}