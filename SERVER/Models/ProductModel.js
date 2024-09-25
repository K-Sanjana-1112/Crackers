const mongoose = require("mongoose");

// create Schema

const productSchema=new mongoose.Schema({


    image:String,
    title:{
        type:String,
        required:[true,'Title is required'],
    },
    details:{
        type:String,
        required:[true,'Details is required'],
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
    },
    quantity:{
        type:Number,
        required:[true,'Quantity is required']

    },
     category:{
        type:String,
        required:[true,'Details is required'],
    },
    
})

//create model(class) to initailize the schema

const ProductModel=mongoose.model('product',productSchema)

module.exports = ProductModel;