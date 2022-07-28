import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { FinancialService } from 'src/app/services/financial.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PersonServiceService } from 'src/app/services/person-service.service';
import { ProductService } from 'src/app/services/product.service';
import { TiketService } from 'src/app/services/tiket.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  people_size: number = 0;
  product_size: number = 0;
  factor_size: number = 0;

  productdata: any;
  tiketdata: any;
  financdata:any;
  
  responseMessage:string;

  constructor(private _authService:AuthService ,private _financialService:FinancialService ,private _tiketService: TiketService, private notificationService:NotificationService, private _productService:ProductService , private _billService:BillService ,private _personService:PersonServiceService){

  }
  ngOnInit() {


    this.getPeopleSize();
    this.getProductSize();
    this.getFactorSize();

    this.tableProductData();
    this.tableTiketData();
    this.tableFinancData();

  }

  getPeopleSize(){
    var email = this._authService.getUserEmail();
    this._personService.getPeople_size(email).subscribe((res :any)=>{
      this.people_size = res?.count;
    })
  }

  getProductSize(){
    var email = this._authService.getUserEmail();
    this._productService.getProduct_size(email).subscribe((res :any)=>{
      this.product_size = res?.count;
    })
  }

  getFactorSize(){
    var email = this._authService.getUserEmail();
    this._billService.getFactor_size(email).subscribe((res :any)=>{
      this.factor_size = res?.count;
    })
  }

  tableProductData(){
    var email = this._authService.getUserEmail();
    this._productService.getproduct(email).subscribe((res:any)=>{
      this.productdata = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  
  }

  tableTiketData(){
    var email = this._authService.getUserEmail();
    this._tiketService.gettiket(email).subscribe((res:any)=>{
      this.tiketdata = res;
      },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }


  tableFinancData(){
    var email = this._authService.getUserEmail();
    this._financialService.getfinancial(email).subscribe((res:any)=>{
      this.financdata = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  
  }
}
