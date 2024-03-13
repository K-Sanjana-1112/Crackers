import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpClient=inject(HttpClient)
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();
 
  // Method to add item to cart
  addItemToCart(username: string, product: Product):Observable<any> {
    return this.httpClient.post<any>('http://localhost:4000/cart-api/cart', { username, product })
  } 

 
  // Method to get cart by username
  getCartByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:4000/cart-api/cart/${username}`);
  }


  removeItemFromCart(username: string, index): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/cart-api/cart/${username}/${index}`);
      }


}































