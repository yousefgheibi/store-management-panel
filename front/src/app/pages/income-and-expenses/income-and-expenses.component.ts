import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialService } from 'src/app/services/financial.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PersonServiceService } from 'src/app/services/person-service.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-income-and-expenses',
  templateUrl: './income-and-expenses.component.html',
  styleUrls: ['./income-and-expenses.component.scss']
})
export class IncomeAndExpensesComponent implements OnInit {
  people: any;
  dataSource:any;
  
  searchKey : string | undefined;
  showAdd !:boolean;
  showEdit !:boolean;
  FinancId !: number;
  data: any;
  responseMessage:any;
  AddFinancForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private formBuilder: FormBuilder,private _peopleService:PersonServiceService ,private _authService:AuthService,private _financialService : FinancialService , public notificationService : NotificationService) { }

  ngOnInit(): void {
    this.AddFinancForm = this.formBuilder.group({
      person_name: [null, [Validators.required]],
      types: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    this.tableData();
    this.getPeople();
  }

  tableData(){
    var email = this._authService.getUserEmail();
    this._financialService.getfinancial(email).subscribe((res:any)=>{
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


  clicktoAddFinanc(){
    this.showAdd = true;
    this.showEdit = false;
    this.AddFinancForm.reset();
  }

  addFinanc(){
    var formData = this.AddFinancForm.value;
    var email = this._authService.getUserEmail();
    const data ={
      user_email:  email,
      person_name: formData.person_name,
      types: formData.types,
      amount : formData.amount,
      description: formData.description,
    }

    this._financialService.add(data).subscribe((res:any)=>{

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
    
  }


  editFinanc(item : any){
    this.showAdd = false;
    this.showEdit = true;
    this.FinancId = item.id;
    this.AddFinancForm.controls['person_name'].setValue(item.person_name);
    this.AddFinancForm.controls['types'].setValue(item.types);
    this.AddFinancForm.controls['amount'].setValue(item.amount);
    this.AddFinancForm.controls['description'].setValue(item.description);
  }

  EditFinancPost(){
    var formData = this.AddFinancForm.value;
    const data ={
      id : this.FinancId, 
      person_name: formData.person_name,
      types: formData.types,
      amount : formData.amount,
      description: formData.description,
    }
    this._financialService.update(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.AddFinancForm.reset();
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
  }


  deleteFinanc(id: number){
    let c = confirm("آیا از حذف کردن این فایل مطمئن هستید ؟");
    if (c) {
      this._financialService.delete(id).subscribe((res:any)=>{
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


getPeople(){
  var email = this._authService.getUserEmail();
  this._peopleService.getpeople(email).subscribe((res:any)=>{
    this.people = res;
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


}


