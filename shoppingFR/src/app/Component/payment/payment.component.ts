import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/Services/share.service';
import {MatIconModule} from '@angular/material/icon';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {Payment} from 'src/app/Models/Payment.model';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import Cart from 'src/app/Models/cart.model';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public order:Cart[];
  payOnDeliverySelected:boolean=false;
  // shippingForm=new FormGroup({

  //   Address:new FormControl('', Validators.required),
   
  // });
  // submitted=false;
  // get Address() {
  //   return this.shippingForm.get('Address');
  // }
  



  // public payment:Payment[];
  // readonly APIUrl ="https://localhost:7275"
  // ///////////////////
  SignUpform = new FormGroup({
   
    username : new FormControl('', Validators.required),
  
    address : new FormControl('',Validators.required),
   
    email : new FormControl('',[Validators.required , Validators.email]),

    cardnumber : new FormControl('',Validators.required),

    cvv : new FormControl('',Validators.required)
   
    
  });

    submitted=false;
 
  get username() {
    return this.SignUpform.get('username');
  }
 
  get email() {
    return this.SignUpform.get('email');
  }
  
  get address() {
    return this.SignUpform.get('address');
  }

  get cardnumber(){
    return this.SignUpform.get('cardnumber')
  }

  get cvv(){
    return this.SignUpform.get('cvv')
  }
  

  constructor(private shared:ShareService, private nav:NavbarServiceService, private fs:FooterService,private router :Router) { }

//   ngOnInit(): void {
//     this.fs.show();
//     this.nav.show();
//   }

//   onSubmit() {
//     this.submitted = true;
   
//     if (this.shippingForm.invalid) {
//       return;
//   }}
//   submitForm() {
//     if (this.shippingForm.invalid) {
//       return;
//     }
//     const address = this.shippingForm.value.Address;
//     this.shared.ShippingDetails(address);
   
//   }
// //   const address = this.shippingForm.get('Address')?.value;
// //   console.log(address);
// //   this.shared.ShippingDetails(address);
// // alert("Order Successful");
// //   this.shippingForm.reset();
// // }
  
ngOnInit(): void {
  this.nav.show();
  this.refreshOrdertList();

  // this.fs.hide();
}

onSubmit() {
  this.submitted = true;
  if (this.SignUpform.invalid) {
    console.log("invalid form");
    return;
}

this.shared.ShippingDetails(this.SignUpform.value.address).subscribe((result:any)=>{
console.log("Hello from signup");
console.log(result);
});
// this.shared.EmailService(this.SignUpform.value.username,this.SignUpform.value.email).subscribe((res)=>{ })
alert("Order Successful");
this.SignUpform.reset();
this.router.navigate(['order-successful']);
}

paymentOptionClicked(opt:number){
  console.log("Clicked");
  if(opt==1){
    this.payOnDeliverySelected=false;
  }
  else{
    this.payOnDeliverySelected=true;
  }
}

refreshOrdertList(){
  this.shared.GetAllCart().subscribe(data=>{
     this.order=data;
     console.log(this.order)
   });
 }

public grandTotal():number{
 let total : number = 0;
 for(let order of this.order){
   total+= order.quantity* order.price;
 }
 return total;
}

}