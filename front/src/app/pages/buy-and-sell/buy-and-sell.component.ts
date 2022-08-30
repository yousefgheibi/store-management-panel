import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
import { saveAs } from 'file-saver';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.scss']
})
export class BuyAndSellComponent implements OnInit {

  dataSource:any;
  searchKey : string | undefined;
  data: any;
  responseMessage:any;
  constructor(private _authService:AuthService,private excelService: ExcelService, private _billService : BillService,public notificationService:NotificationService) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    var email = this._authService.getUserEmail();
    this._billService.getBills(email).subscribe((res:any)=>{
      this.data = res;
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

  deleteFactor(id:number){
    let c = confirm("آیا از حذف کردن این فاکتور مطمئن هستید ؟");
    if (c) {
      this._billService.delete(id).subscribe((res:any)=>{
        this.notificationService.showSuccess(" با موفقیت حذف شد!");
        this.tableData();
   
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

  downloadFactor(fileName :any){
    var data = {
      uuid:fileName
    }

    this._billService.getPdf(data).subscribe((res:any)=>{
      saveAs(res,fileName+'.pdf');
      
    })
  }

  
doSearch(searchKey : string) {
  let result = [];
  if(searchKey.length > 2) {
    result = this.data.filter((item: { person_name: string; }) => {
      // @ts-ignore
      return !(item.person_name.trim().indexOf(this.searchKey.trim()) <= -1);
    });
  }
  if(result.length > 0 ){
    this.data= result;
  }
  else{
      this.tableData();
  }
}
getCSV(){
  this.excelService.download_csv(this.data);
}
}
