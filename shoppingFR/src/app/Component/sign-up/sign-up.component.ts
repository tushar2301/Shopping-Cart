import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ShareService } from 'src/app/Services/share.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/Models/UserDetails.model';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  SignUpform = new FormGroup({
   
    username : new FormControl('', Validators.required),
  
    email : new FormControl('',[Validators.required , Validators.email]),
  
    password : new FormControl('',Validators.required),

    confirmPassword : new FormControl('',Validators.required)
   
    
  });
  submitted=false;
 
  get username() {
    return this.SignUpform.get('username');
  }
 
  get email() {
    return this.SignUpform.get('email');
  }
  
  get password() {
    return this.SignUpform.get('password');
  }
  get confirmPassword() {
    return this.SignUpform.get('confirmPassword');
  }


  constructor(private shared:ShareService, private nav:NavbarServiceService, private fs:FooterService,private router :Router) { }

  ngOnInit(): void {
    this.nav.show();

    // this.fs.hide();
  }

  onSubmit() {
    this.submitted = true;
    if (this.SignUpform.invalid) {
      return;
  }
  this.shared.addUserDetails(this.SignUpform.value).subscribe((result:any)=>{
  console.log("Hello from signup");
  console.log(result);
});
// this.shared.EmailService(this.SignUpform.value.username,this.SignUpform.value.email).subscribe((res)=>{ })
 alert("Sign Up Successful");
  this.SignUpform.reset();
  this.router.navigate(['login']);
}

}
