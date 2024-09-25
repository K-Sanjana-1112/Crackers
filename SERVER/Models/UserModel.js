const mongoose = require("mongoose");

// create Schema

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        minLength:[4,'MinLength is 5']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
    },
    address:{
        type:String,
        required:[true,'Address is required'],
    }
    
})

//create model(class) to initailize the schema

const UserModel=mongoose.model('user',userSchema)

module.exports = UserModel;