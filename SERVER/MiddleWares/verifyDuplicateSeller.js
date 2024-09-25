const SellerModel=require('../Models/SellerModel')

async function verifyDuplicateSeller(req,res,next){

    let newSeller=req.body;
    
    // //verification by username
  let user= await SellerModel.findOne({username:newSeller.username})
  if(user!==null){
    // user already existed
    res.send({message:"Seller already existed"})
  }
  else{
        next()
    }

}

module.exports=verifyDuplicateSeller;