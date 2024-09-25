const mongoose = require("mongoose");

// create Schema

const sellerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        minLength:[4,'MinLength is 4']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
    }
    
    
})

//create model(class) to initailize the schema

const SellerModel=mongoose.model('seller',sellerSchema)

module.exports = SellerModel;