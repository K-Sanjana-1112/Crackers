import { Component,inject } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { User } from '../model/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})





export class LoginComponent {

  login=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(3)]),
    password:new FormControl('',[Validators.required])
    
  });
  
  
  
   userService=inject(UserService)

   isSeller:boolean=false;

  Login(event:any){
  this.isSeller=event.target.value ==="seller"
  this.userService.setIsSeller(this.isSeller)
 }
   
   router=inject(Router)
    Status:any={
    CredentialStatus:false,
    errorMessage:""
   }


  get username(){
     return this.login.get('username')
  }
  get email(){
    return this.login.get('email')
  }

  get password(){
    return this.login.get('password')
  }
  
  // onFormSubmit(){
  //   console.log(this.login.value)
  // };

  onFormLogin(){
   this.userService.isSeller$.subscribe((isSeller)=>{
    if(isSeller){
      this.userService.SellerLogin(this.login.value).subscribe(
        (res)=>{
  
         if(res.message==="Login Success"){
          let token=res.token
           
          this.userService.setCurrentSeller(res.newSeller) 
          this.userService.setSellerLoginStatus(true)       
            // save the token in local storage
          localStorage.setItem('token',token)
          this.router.navigate([`/user-profile/${res.newSeller.username}`])
         }
         else{
          this.Status={
            CredentialStatus:true,
            errorMessage:res.message
           }
          }
        },
        
        (error)=>{console.log(error)}
      )
    }else{
      this.userService.UserLogin(this.login.value).subscribe(
        (res)=>{
  
         if(res.message==="Login Success"){
          let token=res.token
           
          this.userService.setCurrentUser(res.newUser) 
          this.userService.setUserLoginStatus(true)       
            // save the token in local storage
          localStorage.setItem('token',token)
          this.router.navigate([`/user-profile/${res.newUser.username}`])
         }
         else{
          this.Status={
            CredentialStatus:true,
            errorMessage:res.message
           }
          }
        },
        
        (error)=>{console.log(error)}
      )
    }

   })
    
    
   };


}


