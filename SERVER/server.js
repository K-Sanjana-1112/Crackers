// create express app
const exp=require('express')
const app=exp()
const path=require('path')

//body parser ,without this we cant use body method in post and put
app.use(exp.json())

// connect to angular

app.use(exp.static(path.join(__dirname,'../CLIENT/dist/anki/browser')))


require('dotenv').config()// process.env


const mongoose=require('mongoose')
const DB_URL=process.env.LOCAL_DB_URL

// connect to mongoose
mongoose.connect(DB_URL)
.then(()=>{console.log("DB connection Success")})
.catch((err)=>console.log("Error in DB connection",err))


// import API'S

// user API
const userApp=require('./API/userApi')

app.use('/user-api',userApp)


// seller API

const sellerApp=require('./API/sellerApi')

app.use('/seller-api',sellerApp)

// // product API

const productApp=require('./API/productApi')

app.use('/product-api',productApp)

//cart API

const cartApp=require('./API/cartApi')

app.use('/cart-api',cartApp)


app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'../CLIENT/dist/anki/browser/index.html'))

})



function errorHandler(err,req,res,next){
    res.send({message:'error Occured',payload:err.message})
}
app.use(errorHandler)

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`the http port is running on port ${PORT}`))

