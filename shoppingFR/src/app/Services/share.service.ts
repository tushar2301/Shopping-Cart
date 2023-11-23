import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs'; 
import { UserDetails } from '../Models/UserDetails.model';
import { Product } from '../Models/Product.model';
import  Cart  from '../Models/cart.model';
import { feedback } from '../Models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public userService =  UserDetails;
  public products :Product[];
  public product:Product;
  public cart:Cart[];
  readonly APIUrl ="https://localhost:44348"
  constructor(private http:HttpClient) { }

//Product Service
GetAllProduct():Observable<Product[]>{
  return this.http.get<Product[]>(this.APIUrl+'/api/Home')
}
readonly apiurl="https://localhost:44348/api/Admin/AddProduct"
Addproduct(val:any){
  return this.http.post(this.apiurl,val);
}

UpdateProduct(id:any, val: any) {
  return this.http.put<Product[]>(`${this.APIUrl}/api/Admin/UpdateProduct?id=${id}`, val);
}
DeleteProduct(id: number): Observable<any> {
  return this.http.delete<any>(`${this.APIUrl}/api/Admin/${id}`);
}
GetProduct(val:any){
  return this.http.post(this.APIUrl+'api/Prouduct/GetProduct?ProductId=',val);
}



//Cart Service
UpdateCart(qty:number, prN: string){
  console.log(qty,prN)
  const requestBody = {}; //empty body 
  
  return this.http.put<Cart[]>(`${this.APIUrl}/api/Home/UpdateCart?qty=${qty}&prN=${prN}`,requestBody);
  
}
addToCart(val:any, qty:number){
  const payload = {
    productName: val.prName,
    quantity: qty
  };
  return this.http.post<Cart>(this.APIUrl+'/api/Home/AddToCart',payload);
}
GetAllCart():Observable<Cart[]>
{
  
return this.http.get<Cart[]>(this.APIUrl+'/api/Home/BuyNow');
}
DeleteFromCart(prName:string)
{ return this.http.delete<Cart[]>(`${this.APIUrl}/api/Home/DeleteFromCart/${prName}`)
}

//User service


GetAllUserDetails():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'/api/UserDetails/GetAllUserDetails()')
}
addUserDetails(val:any){
  
  console.log(val);
  return this.http.post<UserDetails>(`${this.APIUrl}/api/Authenticate/User_register`, val)
  }
userlogin(val:any){
  console.log(val);
  return this.http.post<UserDetails>(this.APIUrl+'/api/Authenticate/login',val)
}
EmailService(name:any,receiver:any){
  return this.http.get<any[]>(this.APIUrl+'/api/UserDetails/EmailService?name='+name+'&receiver='+receiver)
 }
 getUserProfile(){
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  console.log(tokenHeader);
  return this.http.get(this.APIUrl+'/api/UserDetails/GetUserDetails?UserId=', {headers : tokenHeader});
}

//Order Service
addOrderDetails(val:any){
  console.log(val);
  return this.http.post<Cart[]>(this.APIUrl+'/api/Order/SaveOrderDetails',val)
}
ShippingDetails(val:any){
  const emt = {};
  console.log(val);
  return this.http.post<UserDetails>(`${this.APIUrl}/api/Home/checkout?address=${val}`,emt)
  // return this.http.put<Cart[]>(`${this.APIUrl}/api/Home/UpdateCart?qty=${qty}&prN=${prN}`,requestBody);

  }



}





























// GetAllOrderDetails():Observable<order[]>
// {
//   return this.http.get<order[]>(this.APIUrl+'/api/Order/GetAllOrderDetails()')
// }

    //  GetAllUserDetailsbyEmail(val:any):{
    //   console.log(val);
    //   return this.http.get<UserDetails[]>(this.APIUrl+'api/UserDetails/GetUserbyEmail?EmailId=',val)
    //   }

///api/UserDetails/GetUserbyEmail