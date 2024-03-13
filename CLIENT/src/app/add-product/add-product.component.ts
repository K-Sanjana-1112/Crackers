import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../model/Product';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  userService=inject(UserService)
  product:FormGroup;
  file:File;
  fileName:string="No file selected "
  
  

  ngOnInit(): void {

    
   this.product=new FormGroup({
     
     image:new FormControl('',[Validators.required]),
     title:new FormControl('',[Validators.required]),
     details:new FormControl('',[Validators.required]),
     price:new FormControl('',[Validators.required]),
     quantity:new FormControl('',[Validators.required]),
     category:new FormControl('',[Validators.required])
    });
    
      
  }
 
  get image(){
    return this.product.get('image')
  }
  get title(){
    return this.product.get('title')
  }
  get details(){
   return this.product.get('details')
  }
  get price(){
    return this.product.get('price')

  }
  get quantity(){
    return this.product.get('quantiy')

  }
  get category(){
    return this.product.get('category')
  }

  onChange(file:File){
    if(file){
      this.fileName=file.name;
      this.file=file
    }
  }

 

  submit(){
        
      // formData obj preparation

        const formData=new FormData()

        // product Object from NgForm Obj
       const productObj=this.product.value;
       console.log(productObj)
     //append image to it
       formData.append('photo',this.file)
      //append product obj by converting it to string
      formData.append('productObj',JSON.stringify(productObj));
         // pass form data obj to service to make POST req
    this.userService.createProduct(formData).subscribe(
       (res)=>{
        console.log(res)
        this.onReset()
        
        if(res.message==="Product Created"){
          
  
        }else{
          // this.displayUserStatus=true;
        }
      },
       (error)=>{console.log(error)}
       );
  
}



onReset(){
  this.product.reset()
  this.product.markAsPristine();
  this.product.markAsUntouched

}

























}
