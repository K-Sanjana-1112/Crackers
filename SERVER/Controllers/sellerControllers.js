const SellerModel=require('../Models/SellerModel')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')

// create Seller
const createSeller=async(req,res)=>{
   
  
    const newSeller=req.body;
    console.log(newSeller)
     
  
     if(!newSeller.username || !newSeller.password || !newSeller.email ){
      return res.send({message:" Please send Valid User"})
  
     }
     if(newSeller.username.length<3){
      return res.send({message:"Minimum length is 3"})
    }
    

  
  
    // if user not existed
    // hash the password
    let hashedpwd= await bcryptjs.hash(newSeller.password,5)
  // replace plain pwd with hashed pwd
  newSeller.password=hashedpwd;
  
   // save user
   SellerModel.create(newSeller)
   res.send({message:"Seller Created",payload:newSeller})
  
  }


// login 

const sellerLogin= async (req,res)=>{
  let sellerLogin=req.body
   // check username
   let sellerFromDb=await SellerModel.findOne({username:sellerLogin.username})

   if(sellerFromDb===null){
     res.send({message:"Invalid Seller Name"})

   }else{
     // check password
     let result= await bcryptjs.compare(sellerLogin.password,sellerFromDb.password);
     if (result===false){
       res.send({message:"Invalid Password"})
     }else{
       let signedPwd=jwt.sign({username:sellerFromDb.username},process.env.SECRET_KEY,{expiresIn:50})
       
       res.send({message:"Login Success",token:signedPwd,newSeller:sellerFromDb})
       
     }
   }
}

  

  module.exports={createSeller,sellerLogin}