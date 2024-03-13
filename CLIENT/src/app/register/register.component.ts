import { Component,OnInit,inject } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import {Seller} from '../model/Seller'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {
  register:FormGroup;
 ngOnInit(): void {

  this.register=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(5)]),
    password:new FormControl('',[Validators.required]),
    emailControl:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    companyName:new FormControl('',[Validators.required])
     });
   
 }
 isSeller:boolean=false;

  Register(event:any){
  this.isSeller=event.target.value ==="seller"
  this.userService.setIsSeller(this.isSeller)
}
  
  userService=inject(UserService)
   router=inject(Router)
   displayUserStatus:boolean=false;
   

  get username(){
    return this.register.get('username')
  }
  get password(){
    return this.register.get('password')
  }
  get emailControl(){
   return this.register.get('emailControl')
  }
  get address(){
    return this.register.get('address')

  }
  get companyName(){
    return this.register.get('companyName')

  }
  
  onFormRegister(){
  this.userService.isSeller$.subscribe((isSeller)=>{
    if(isSeller){
      
    
      let {username,password,emailControl,companyName}=this.register.value;
     let newSeller=  new Seller( username,password,emailControl,companyName);
     this.userService.createSeller(newSeller).subscribe(
       (res)=>{
        console.log(res)
        if(res.message==="Seller Created"){
          this.router.navigate(['/login'])
  
        }else{
          this.displayUserStatus=true;
        }
      },
       (error)=>{console.log(error)}
       );
     
    }
    else{
      
      let {username,password,emailControl,address}=this.register.value;
       let newUser=  new User( username,password,emailControl,address);
       this.userService.createUser(newUser).subscribe(
         (res)=>{
          console.log(res)
          if(res.message==="User Created"){
            this.router.navigate(['/login'])
    
          }else{
            this.displayUserStatus=true;
          }
        },
         (error)=>{console.log(error)}
       )};

  });
  
}
}



  











  
  


  



 