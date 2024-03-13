import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { JavaComponent } from './java/java.component';
import { PythonComponent } from './python/python.component';
import { NodejsComponent } from './nodejs/nodejs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { NotfoundComponent } from './notfound/notfound.component';
import { provideHttpClient ,withFetch, withInterceptors} from '@angular/common/http';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { authInterceptor } from './auth.interceptor';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TechnologiesComponent,
    JavaComponent,
    PythonComponent,
    NodejsComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    UserProfileComponent,
    UserEditComponent,
    ProductComponent,
    CartComponent,
    AddProductComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [provideHttpClient(withFetch()),provideHttpClient(withInterceptors([authInterceptor]))
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
