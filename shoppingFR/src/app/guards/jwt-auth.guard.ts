import { Injectable } from '@angular/core';
import {CanActivate, Route, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthGuard implements CanActivate {
  constructor(private auth: AccountService, private router: Router){}
  canActivate(){
    if(this.auth.isLoggedIn())
    {
      return true;
    }
    else{
      alert("Please Login First");
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
