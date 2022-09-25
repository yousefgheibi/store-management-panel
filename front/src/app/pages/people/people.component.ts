import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleModel } from 'src/app/models/people.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PeopleService } from 'src/app/services/people.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  dataSource:any;
  
  searchKey : string | undefined;
  showAdd !:boolean;
  showEdit !:boolean;
  personId !: number;
  data: PeopleModel[];
  responseMessage:any;
  AddPersonForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private formBuilder: FormBuilder, private excelService: ExcelService,private _authService:AuthService,private _peopleService : PeopleService , public notificationService : NotificationService) { }

  ngOnInit(): void {

    this.AddPersonForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      credit: [null, [Validators.required]]
    });

    this.tableData();
  }

  tableData(){
    var email = this._authService.getUserEmail();
    this._peopleService.getpeople(email).subscribe((res:any)=>{
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


  clicktoAddPerson(){
    this.showAdd = true;
    this.showEdit = false;
    this.AddPersonForm.reset();
  }

  addPerson(){
    var formData = this.AddPersonForm.value;
    var email = this._authService.getUserEmail();
    const data ={
      user_email:  email,
      name: formData.name,
      category: formData.category,
      phone: formData.phone,
      address : formData.address,
      credit: formData.credit,
    }

    this._peopleService.add(data).subscribe((res:any)=>{

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


  editPerson(item : any){
    this.showAdd = false;
    this.showEdit = true;
    this.personId = item.id;
    this.AddPersonForm.controls['name'].setValue(item.name);
    this.AddPersonForm.controls['category'].setValue(item.category);
    this.AddPersonForm.controls['phone'].setValue(item.phone);
    this.AddPersonForm.controls['address'].setValue(item.address);
    this.AddPersonForm.controls['credit'].setValue(item.credit);
  }

  EditPersonPost(){
    var formData = this.AddPersonForm.value;
    const data ={
      id : this.personId, 
      name: formData.name,
      category: formData.category,
      phone: formData.phone,
      address : formData.address,
      credit: formData.credit,
    }
    this._peopleService.update(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.AddPersonForm.reset();
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


  deletePerson(id: number){
    let c = confirm("آیا از حذف کردن این شخص مطمئن هستید ؟");
    if (c) {
      this._peopleService.delete(id).subscribe((res:any)=>{
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


doSearch(searchKey : string) {
  let result = [];
  if(searchKey.length > 2) {
    result = this.data.filter((item: { name: string; }) => {
      // @ts-ignore
      return !(item.name.trim().indexOf(this.searchKey.trim()) <= -1);
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


