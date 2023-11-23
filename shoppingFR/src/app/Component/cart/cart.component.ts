import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cart from 'src/app/Models/cart.model';
import { ShareService } from 'src/app/Services/share.service';
import {MatIconModule} from '@angular/material/icon';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Product } from 'src/app/Models/Product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Editform = new FormGroup({
    quantity: new FormControl('', Validators.required),});
    submitted=false;
  get quantity() {
    return this.Editform.get('quantity');
  }
  public Cart:Cart[]=[];
  public products: any[] = [];
  public totalAmount: number = 0;

  readonly APIUrl ="https://localhost:44348"
  constructor(private fs: FooterService, private cdr: ChangeDetectorRef, private nav :NavbarServiceService,private shared:ShareService ,public http :HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful;
    this.fs.show();
    this.fs.doSomethingElseUseful();
    this.refreshCartList();
  }
  isActive = true;
  refreshCartList(){
  this.shared.GetAllCart().subscribe(data =>{
    console.log(data);
    this.Cart=data;
    // this.products=data.products;
  });

  }
  DeleteCart(prName:string){
    if(confirm('Are you sure?')){
      this.shared.DeleteFromCart(prName).subscribe(data=>{
        console.log(data);
      });
      location.reload();
    }
}
// onSubmit() {
//   this.submitted = true;
//   if (this.Editform.invalid) {
//     return;
// }
// this.shared.UpdateCart(this.Editform.value).subscribe((result)=>{

// });
// }

incrementQuantity(prName: string) {
  // Update the quantity in your local cart array
  this.Cart = this.Cart.map((cart: Cart) => {
    if (cart.prName === prName) {
      const newQuantity = cart.quantity + 1;

      // Call the shared service to update the cart with the new quantity value
      this.shared.UpdateCart(newQuantity, prName).subscribe(result => {
        console.log(result);
      });

      return {
        ...cart,
        quantity: newQuantity,
      };
    }
    return cart;
  });
  // this.cdr.detectChanges();
  location.reload();
}
  decrementQuantity(prName: string) {
    // Update the quantity in your local cart array
    this.Cart = this.Cart.map((cart: Cart) => {
      if (cart.prName === prName) {
        const newQuantity = cart.quantity - 1;

        // Call the shared service to update the cart with the new quantity value
        this.shared.UpdateCart(newQuantity, prName).subscribe(result => {
          console.log(result);
        });

        return {
          ...cart,
          quantity: newQuantity,
        };
      }
      return cart;
    });
    
    // this.cdr.detectChanges();
    location.reload();
  }


  public grandTotal():number{
    let total : number = 0;
    for(let cart of this.Cart){
     // total+= cart.quantity* cart.price;
     total+=cart.amount;
    }
    return total;
  }
  
addOrder(Cart:Cart){
  console.log(Cart);
  this.shared.addOrderDetails(this.Cart).subscribe(res=>{

  });
  alert('Order successful!');
  this.router.navigate(['order']);
}

}

// incrementQuantity(cartId:number){
//   this.Cart = this.Cart.map((Cart:Cart) => {
//     if (Cart.cartId === cartId) {
//       // Cart.quantity=Cart.quantity+1;
//       // console.log(Cart);
//       //this.UpdateCart(Cart.cartId);
//       return {
//         ...Cart,
//         quantity: Cart.quantity + 1,
        
//       };

//     }
//     return Cart;
//   });
// }
//  UpdateCart(cartId:number){
//    return this.http.put(this.APIUrl+'/api/Cart/UpdateCart',cartId)
//  }