import { HttpClient } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { Seller } from './model/Seller';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient=inject(HttpClient);


  isSeller=new BehaviorSubject(false);
  isSeller$=this.isSeller.asObservable()

  setIsSeller(value:boolean){
    this.isSeller.next(value)
  }

 selectedCategorySubject=new BehaviorSubject<string>('');

 selectedCategory$=this.selectedCategorySubject.asObservable( );

  setCategory(category:string){

    this.selectedCategorySubject.next(category)
  }


 userLoginStatus=new BehaviorSubject(false)
 currentUser=new BehaviorSubject({
  username:'',
  password:'',
  emailControl:'',
  address:''
  
 })

 setCurrentUser(user:User){
  this.currentUser.next(user)

 }
 getCurrentUser(){
  return this.currentUser.asObservable()
 }


  setUserLoginStatus(value:boolean){
    this.userLoginStatus.next(value)

  }
  getUserLoginStatus(){
    return  this.userLoginStatus.asObservable()

  }

 sellerLoginStatus=new BehaviorSubject(false)
 currentSeller=new BehaviorSubject({
  username:'',
  password:'',
  emailControl:'',
  companyName:''
 })

 setCurrentSeller(seller:Seller){
    this.currentSeller.next(seller)
  
   }
   getCurrentSeller(){
    return this.currentSeller.asObservable()
   }
  
  
    setSellerLoginStatus(value:boolean){
      this.sellerLoginStatus.next(value)
  
    }
    getSellerLoginStatus(){
      return  this.sellerLoginStatus.asObservable()
  
    }
  

  //create User
  createUser( newUser:User):Observable<any>{
    return  this.httpClient.post<any>('http://localhost:4000/user-api/user',newUser);
  }


  //create Seller
  createSeller( newSeller:Seller):Observable<any>{
    return  this.httpClient.post<any>('http://localhost:4000/seller-api/seller',newSeller);
  }


   //create Product
   createProduct( formData):Observable<any>{
    return  this.httpClient.post<any>('http://localhost:4000/product-api/product',formData);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    let encodedCategory=encodeURIComponent(category)
    return this.httpClient.get<any[]>(`http://localhost:4000/product-api/product/${encodedCategory}`);
  }

  getCategories(){
    return this.httpClient.get<any[]>('http://localhost:4000/product-api/categories')
  }

  
 


 // User login

 UserLogin(userCredObj):Observable<any>{
  return this.httpClient.post('http://localhost:4000/user-api/user-login',userCredObj)

 }

 // Seller login

 SellerLogin(sellerCredObj):Observable<any>{
  return this.httpClient.post('http://localhost:4000/seller-api/seller-login',sellerCredObj)

 }

 //get user by username

//  getUserByUserName(username):Observable<any>{
//   return this.httpClient.get(`http://localhost:3000/users?username=${username}`)

//  }



getProtected(){
  return this.httpClient.get('http://localhost:4000/user-api/protected')

}






 userLogout(){
  this.setUserLoginStatus(false)
  // reset 
  this.setCurrentUser({
    username: '',
    password: '',
    emailControl: '',
    address: ''
  })
  // remove token
  localStorage.removeItem('token')
 }



 sellerLogout(){
  this.setSellerLoginStatus(false)
  // reset 
  this.setCurrentSeller({
    username: '',
    password: '',
    emailControl: '',
    companyName: ''
  })
  // remove token
  localStorage.removeItem('token')
 }


}
