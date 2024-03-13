import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../model/User';
import { Seller } from '../model/Seller';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  router=inject(Router)
  userService = inject(UserService)
  protectedUser: string = ''
  loggedInUser: any;
  loggedInSeller: any;
  selectedCategory:string;


  isSeller: boolean = false;


  ngOnInit(): void {
    

    this.userService.isSeller$.subscribe((isSeller) => {
      this.isSeller = isSeller;
    if (this.isSeller)
       {
        this.userService.getCurrentSeller().subscribe({
          next: (seller: Seller) => { this.loggedInSeller = seller },
          error: (err) => { console.log("Error in seller-profile", err) }  });
         

      }

      else
       {
        this.userService.getCurrentUser().subscribe({
          next: (user: User) => { this.loggedInUser = user },
          error: (err) => { console.log("Error in user-profile", err) } });


      }

    })
    

  }


  getProducts(){
    this.router.navigate(['/product'])
    console.log("Products")
   
    
  }

  getAddProducts(){
    this.router.navigate(['/add-product'])
    console.log("Products")

  }
  getAddCart(){
    this.router.navigate(['/cart'])
    console.log("Products")

  }

 




}










