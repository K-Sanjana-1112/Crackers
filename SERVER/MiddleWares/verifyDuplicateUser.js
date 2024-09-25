const UserModel=require('../Models/UserModel')

async function verifyDuplicateUser(req,res,next){

    let newSeller=req.body;
    
    // //verification by username
  let user= await UserModel.findOne({username:newSeller.username})
  if(user!==null){
    // user already existed
    res.send({message:"User already existed"})
  }
  else{
        next()
    }

}

module.exports=verifyDuplicateUser;