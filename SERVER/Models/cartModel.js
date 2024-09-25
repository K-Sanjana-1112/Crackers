const mongoose = require("mongoose");

// create Schema

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true },
    items: [
      {
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
    }
      }
    ]
  
});
//create model(class) to initailize the schema

// Create Cart model
const CartModel = mongoose.model('Cart', cartSchema);
 
module.exports = CartModel;