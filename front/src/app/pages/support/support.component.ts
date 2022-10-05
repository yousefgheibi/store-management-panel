import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TiketService } from 'src/app/services/tiket.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
import { SupportModel } from 'src/app/models/support.model';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  dataSource : SupportModel[] = [];
  searchKey : string | undefined;
  responseMessage: any;
  p: any;
  AddTiketForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private _authService:AuthService, private formBuilder : FormBuilder,private _tiketService : TiketService,private notificationService:NotificationService) { }

  ngOnInit(): void {
   this.AddTiketForm = this.formBuilder.group({
    title: [null, [Validators.required]],
    subject: [null, [Validators.required]],
    message: [null, [Validators.required]],
  });

  this.tableData();
  }

  tableData(){
    var email = this._authService.getUserEmail();
    this._tiketService.gettiket(email).subscribe((res:any)=>{
      this.dataSource = res;
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

  doSearch(searchKey : string) {
    let result = [];
    if(searchKey.length > 2) {
      result = this.dataSource.filter((item: { title: string; }) => {
        // @ts-ignore
        return !(item.title.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if(result.length > 0 ){
      this.dataSource = result;
    }
    else{
        this.tableData();
    }
  }


  addTiket(){
    var formData = this.AddTiketForm.value;
    var email = this._authService.getUserEmail();
    const data ={
      user_email:  email,
      title: formData.title,
      subject: formData.subject,
      message: formData.message,
    }

    this._tiketService.add(data).subscribe((res:any)=>{
 
      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
    this.AddTiketForm.reset();
  }


  deleteTicket(id: number){
    let c = confirm("آیا از حذف این ایمیل مطمئن هستید?");
    if (c) {
      this._tiketService.deletetiket(id).subscribe((res:any)=>{
        this.notificationService.showSuccess("با موفقیت حذف شد!");
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

}
