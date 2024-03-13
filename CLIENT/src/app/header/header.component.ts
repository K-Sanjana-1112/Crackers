import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userService=inject(UserService)
  status:boolean;
 






  ngOnInit(): void {

    
   this.userService.getUserLoginStatus().subscribe({
    next:(userLoginStatus)=>{this.status=userLoginStatus}

   })

   this.userService.getSellerLoginStatus().subscribe({
    next:(sellerLoginStatus)=>{this.status=sellerLoginStatus}
    
   }

   )
  
  
  
  }

 



}


