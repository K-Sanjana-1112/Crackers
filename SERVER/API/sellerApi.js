const exp=require('express')

const sellerApp=exp.Router()

const {createSeller,sellerLogin}=require('../Controllers/sellerControllers')

const verifyDuplicateSeller=require('../MiddleWares/verifyDuplicateSeller')
const expressAsyncHandler=require('express-async-handler')

// create User
sellerApp.post('/seller',verifyDuplicateSeller,expressAsyncHandler(createSeller))

// login Seller

sellerApp.post('/seller-login',expressAsyncHandler(sellerLogin))

module.exports=sellerApp








module.exports=sellerApp