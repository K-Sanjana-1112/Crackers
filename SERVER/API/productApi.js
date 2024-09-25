const exp=require('express')
const { createProduct,getProduct,getCategories,deleteProduct } = require('../Controllers/productControllers')
const {images}=require('../MiddleWares/cloudinaryUpload')
const productApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')



productApp.post('/product',images.single('photo'),expressAsyncHandler(createProduct))

// get product
productApp.get('/product/:category',expressAsyncHandler(getProduct))

productApp.get('/categories',expressAsyncHandler(getCategories))
//delete product
productApp.delete('/product/:id',expressAsyncHandler(deleteProduct))

module.exports=productApp