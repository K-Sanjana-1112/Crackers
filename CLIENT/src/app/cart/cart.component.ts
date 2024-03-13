import { Component, OnInit ,inject} from '@angular/core';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  userService=inject(UserService)
  username: string;
 cartService=inject(CartService)
  cartItems:any[];
 

 
  ngOnInit(): void {
     // Get username from userService
     this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        
        this.username = user.username 
        console.log(this.username)
      
      },
      error: (err) => { console.log("Error in cart-profile", err) } });
   
    // Retrieve cart based on username
    this.getCart()
   
    
   
  }

  getCart(){
    this.cartService.getCartByUsername(this.username).subscribe({
      next:(cart) => {
        console.log(cart)
       this.cartItems = cart['payload'].items;
       console.log('Cart:', this.cartItems);
     },
     error:(error) => {
       console.error('Error fetching cart:', error);
     }
    } );
  }

 removeItem(index:number){
 
    this.cartService.removeItemFromCart(this.username, index).subscribe(
      (res) => {
            this.cartItems.splice(index,1)
            this.getCart()
        console.log('Item removed from cart:', res);
       
      },
      error => {
        console.error('Error removing item from cart:', error);
        
      }
    );
  }
 
 
  
  
  

}
