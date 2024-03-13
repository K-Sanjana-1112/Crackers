import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

 let  token=localStorage.getItem('token')
if(!token){

  return next(req);
}else{
  // clone the req obj since req obj is immuntable
const reqWithToken=req.clone({
  headers:req.headers.set('Authorization',`Bearer ${token}`)
})
  return next(reqWithToken)
}
 








};
