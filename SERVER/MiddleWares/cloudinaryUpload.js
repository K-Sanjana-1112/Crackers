const multer=require('multer')
const cloudinary=require('cloudinary').v2;
require('dotenv').config()
const fs=require('fs')


if(!fs.existsSync("./pictures")){
    !fs.mkdirSync("./pictures")

}

//configure
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
  
  
  })


// to store in local storage location

const storageLocation = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pictures')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,file.originalname);// for extension
  }
})


const images=multer({storage:storageLocation })
module.exports={images,cloudinary}