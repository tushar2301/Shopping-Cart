import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/Services/share.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public IsLogin =false;
  public LoginForm = this.fb.group({​​​​​
    email: ['',[Validators.required,Validators.email]], 
    password: ['', Validators.required]});
    submitted = false;
    
    get password(){
      return this.LoginForm.get('password');
    }
    get email(){
      return this.LoginForm.get('email');
      }
    get f() { return this.LoginForm.controls; }
    
  constructor( private http:HttpClient ,
      private nav:NavbarServiceService, 
      private Service:ShareService,
      private auth: AccountService,
      private fb:FormBuilder, 
      private Http:HttpClient,
      private router:Router) { } 


    ngOnInit(): void {
    this.nav.show();
    
    }
onSubmit() {
    this.Service.userlogin(this.LoginForm.value).subscribe(
      (res:any) =>{
       // localStorage.setItem('token',res.token);
        console.log(res.token);
        console.log(res.uRole);
        this.auth.setRole(res.uRole);
        this.auth.storeToken(res.token);
        if(res.uRole=="Admin")
        {
          this.router.navigate(['login/admin']);
        }
        else{
         
          //this.IsLogin=true;
          this.router.navigate(['products']); //login/user
        }
        
      },
      err =>{
        // if(err.status==401)
        if(err)
        alert("Authentication Failed!! Invalid Credentails");
        else
        console.log(err);
      }
    );

    
  }
}
/*if(localStorage.getItem('token')!=null && this.LoginForm.value.EmailId=="admin@gmail.com" && this.LoginForm.value.Password=="admin")
    this.router.navigate(['login/admin']);
    else
    this.router.navigate(['login/user']);
    */

    /*
      onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {return;}
    this.Service.userlogin(this.LoginForm.value).subscribe(
      (res:any) =>{
        localStorage.setItem('token',res.token);
        console.log(res.token);
        alert("Login Successful");
        this.LoginForm.reset();
        //if(this.LoginForm.value.EmailId=='admin@admin.com')
        //this.router.navigate(['login/admin/dashboard']);
        //else
        //this.router.navigate(['login/user/dashboard

      */