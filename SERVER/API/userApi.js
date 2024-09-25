const exp=require('express')
const usersApp=exp.Router();


require('dotenv').config()// process.env
const {getUsers,getUserByUserName,createUser,updateUser,deleteUser,userLogin,protectedUser}=require('../Controllers/userControllers')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../MiddleWares/verifyToken')
const verifyDuplicateUser=require('../MiddleWares/verifyDuplicateUser')



//get all Users
usersApp.get('/users',expressAsyncHandler(getUsers))
// get User by UserName
usersApp.get('/user/:username',expressAsyncHandler(getUserByUserName))

// create User
usersApp.post('/user',verifyDuplicateUser,expressAsyncHandler(createUser))

// login User

usersApp.post('/user-login',expressAsyncHandler(userLogin))

// protected User
usersApp.get('/protected',verifyToken,expressAsyncHandler(protectedUser))


//update User
usersApp.put('/user',expressAsyncHandler(updateUser))

// delete User
usersApp.delete('/user/:username',expressAsyncHandler(deleteUser))



module.exports=usersApp