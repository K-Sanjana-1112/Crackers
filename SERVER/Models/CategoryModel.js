const mongoose = require('mongoose');
 
const productSchema=new mongoose.Schema({


    image:{
        type:String,
        required:[true,'Image is required'],
    },
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

    }
    
})
 
const categorySchema = new mongoose.Schema({
  categoryName:{
    type:String,
    required:[true,'categoryName is required'],
},
  products: [productSchema],
});
 
const Category = mongoose.model('Category', categorySchema);
 
module.exports = Category;