import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/Services/navbar-service.service';
import { FooterService } from 'src/app/Services/footer.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ShareService } from 'src/app/Services/share.service';
import Cart from 'src/app/Models/cart.model';

@Component({
  selector: 'app-order-successful',
  templateUrl: './order-successful.component.html',
  styleUrls: ['./order-successful.component.css']
})
export class OrderSuccessfulComponent implements OnInit {

  public order:Cart[];
  constructor(private nav:NavbarServiceService, private fs:FooterService,private router:Router, private shared:ShareService) { }

  ngOnInit(): void {
    this.nav.show();
    this.fs.show();
    this.refreshOrdertList();
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

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  printPurchaseOrder(){
    console.log("Printing PDF");
  
    let data = document.getElementById("purchaseOrderDiv")!;
    this.generatePDF(data);
  }

  generatePDF(htmlContent: HTMLElement){
  
    html2canvas(htmlContent).then(canvas => {
      let imgWidth = 290;
      let imgHeigt = (canvas.height * imgWidth / canvas.width)
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l','mm','a4');
      var position = 10;
      pdf.addImage(contentDataURL,'PNG',0,position,imgWidth,imgHeigt);
      pdf.save('PurchaseOrder.pdf');
    })
  
  }
}