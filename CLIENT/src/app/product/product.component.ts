import { Component,Input,OnInit,inject } from '@angular/core';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';
import { User } from '../model/User';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  userService=inject(UserService)
 cartService=inject(CartService) 
  products:any[]
  username: string;
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  categories:any[];
  isSeller: boolean = false;

  ngOnInit():void

  
    {  

      this.userService.isSeller$.subscribe((isSeller) => {
        this.isSeller = isSeller;
      });

      this.userService.getCategories().subscribe({
        next:(res)=>{
          
          this.categories=res['payload']
         
         }
    
      });

      this.userService.selectedCategory$.subscribe(category=>
        {
        if(category){

        
            this.userService.getProductsByCategory(category).subscribe(
              (res) => {
                
                this.products = res['payload'];
              },
              (error) => {
                console.error('Error fetching products:', error);
        });
          

        }else{
          this.products=[];

        }
      });
  }     

  filterProducts(category){
    this.userService.setCategory(category)

  }
        
      
       
 
   
 
addItemToCart(product) {

    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        
        this.username = user.username 
       
      
      },
      error: (err) => { console.log("Error", err) } 
    });
    
    
     this.cartService.addItemToCart(this.username, product).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(error)=>{
        console.log(error)
      }
      });
      
    
    
  }
 
 
















}
