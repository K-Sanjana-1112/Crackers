import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { JavaComponent } from './java/java.component';
import { PythonComponent } from './python/python.component';
import { NodejsComponent } from './nodejs/nodejs.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
 {
  path:'home',
  component:HomeComponent
 },
 {
  path:'register',
  component:RegisterComponent
 },
 {
  path:'login',
  component:LoginComponent
 },
 
 {
  path:'user-profile/:username',
  component:UserProfileComponent,
  
},
 {
  path:'product',
  component:ProductComponent
 },
 {
  path:'add-product',
  component:AddProductComponent
 },
 {
  path:'cart',
  component:CartComponent
 },
 {
  path:'',
  redirectTo:'home',
  pathMatch:'full'
 },
 {
  path:'**',
  component:NotfoundComponent
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }