import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {



  user:Users={
    username:'Vijaya',email:'vijaya@email.com'
  }

  userEdit=new FormGroup({
    username:new FormControl(''),
    email:new FormControl('')
    
  })
  userEditStatus: boolean=false;

  onUserEdit(){
    
      this.userEditStatus=true;
      this.userEdit.get('username').setValue(this.user.username)
    this.userEdit.get('email').setValue(this.user.email)
 
 
    }
    onUserSave(){
      this.userEditStatus=false;
    this.user=<any>this.userEdit.value

    }








}
interface Users{
  username?:string;
  email?:string
}

