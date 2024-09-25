const exp=require('express')
const {createCart,getCart,deleteCart,decrement,increment} = require('../Controllers/cartControllers')

const cartsApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')


// cartsApp.post('/cart',(req,res)=>{
//     console.log(req.body)
//     res.send({message:" Product Created"})


// }
// )

cartsApp.get('/cart',(req,res)=>{
    res.send({message:" Product Created"})

})
// Endpoint to add item to cart
cartsApp.post('/cart',expressAsyncHandler(createCart))
// Endpoint to get cart by username
cartsApp.get('/cart/:username',expressAsyncHandler(getCart));


cartsApp.delete('/cart/:username/:index',expressAsyncHandler(deleteCart))


cartsApp.post('/:username/:index/increment',expressAsyncHandler(increment))

cartsApp.post('/:username/:index/decrement', expressAsyncHandler(decrement));





module.exports=cartsApp