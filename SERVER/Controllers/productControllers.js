const ProductModel=require('../Models/ProductModel')


const {cloudinary}=require('../MiddleWares/cloudinaryUpload')
const fs=require('fs')


const createProduct= async (req,res)=>{
    let product= JSON.parse(req.body.productObj)

    let productexisted=await ProductModel.findOne({title:product.title})
    console.log(productexisted)
    if(productexisted!==null){
        res.send({message:"Product already existed"})


    }else{
        let result=await cloudinary.uploader.upload(req.file.path)
     
        product.image=result.url;
        const  newProduct=await ProductModel.create(product)
        
        res.send({message:"Product Created",payload:newProduct})
        
        // remove from local folder
        fs.unlink(req.file.path,err=>{
            if(err){
               throw err
            }
            console.log("image removed from local folder")
       
           });

    }
   

    

  
  

    
        
}
   


const  getProduct=async (req, res) => {
    
    const category = req.params.category;
     const products= await ProductModel.find({category:category})
         res.send({message:"products",payload:products} )

    
};
    

 const getCategories=async (req,res)=>{
     let categories= await ProductModel.distinct('category')
     
     res.send({message:"categories",payload:categories} )
}
   

const deleteProduct=async(req,res)=>{
    let product=await ProductModel.findByIdAndDelete({_id:req.params.id})
    res.status(200).send({message:"Product removed",payload:product})

}



module.exports={createProduct,getProduct,getCategories,deleteProduct}