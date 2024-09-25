const UserModel=require('../Models/UserModel')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')

// get Users
const getUsers=async (req,res)=>{
  let users=await UserModel.find()
 
  res.status(200).send({message:"All Users",payload:users})
}

// get User by UserName
const getUserByUserName=async(req,res)=>{
    res.status(200).send({message:'User By UserName'})

}

// create User
const createUser=async(req,res)=>{
  // the file property is added by multer middleware to req obj ,it contsins cdn link

  const newUser=req.body;
 

   if(!newUser.username || !newUser.password || !newUser.email){
    return res.send({message:" Please send Valid User"})

   }
   if(newUser.username.length<3){
    return res.send({message:"Minimum length is 3"})
  }
  


  // if user not existed
  // hash the password
  let hashedpwd= await bcryptjs.hash(newUser.password,5)
// replace plain pwd with hashed pwd
newUser.password=hashedpwd;

 // save user
 UserModel.create(newUser)
 res.send({message:"User Created",payload:newUser})

}


// login 

const userLogin= async (req,res)=>{
    let userLogin=req.body
    
     // check username
     let userFromDb=await UserModel.findOne({username:userLogin.username})
 
     if(userFromDb===null){
       res.send({message:"Invalid User Name"})
 
     }else{
       // check password
       let result= await bcryptjs.compare(userLogin.password,userFromDb.password);
       if (result===false){
         res.send({message:"Invalid Password"})
       }else{
         let signedPwd=jwt.sign({username:userFromDb.username},process.env.SECRET_KEY,{expiresIn:50})
         
         res.send({message:"Login Success",token:signedPwd,newUser:userFromDb})
         
       }
     }
}


// protected User
const protectedUser=(req,res)=>{
    // console.log(req.headers)
    res.send({message:"protected route"})
}

// update User
const updateUser=async(req,res)=>{
     
    const user= await UserModel.findOneAndUpdate({username:req.body.username},{username:req.body.username})
   console.log(user)
    res.status(200).send({message:'User updated',payload:user})

}

const deleteUser=async(req,res)=>{
     
    // const user=await UserModel.findOneAndDelete({username: .username})
    res.status(200).send({message:'User deleted',payload:user})

}

module.exports={getUsers,getUserByUserName,createUser,updateUser,deleteUser,userLogin,protectedUser}