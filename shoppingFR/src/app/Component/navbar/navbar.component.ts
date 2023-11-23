import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
@Component({
 
  selector: 'sd-navbar',
   templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuType: string = 'default';
  
  constructor(public nav: NavbarServiceService,public router:Router, public accountService: AccountService) { }

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if(val.url){
        if(localStorage.getItem('product') && val.url.includes('product')){
          console.warn("product area")
          this.menuType="product"
        }
        else{
          console.warn("Outside product")
          this.menuType='default'
        }
      }
    })
  }   


  


  onLogout() {
    localStorage.clear();
    alert("Logged out")
    this.router.navigate(['/home']);
  }
}
