import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  responseMessage : string;
  data : any;
  updateForm : FormGroup;
  userId: any;
  constructor(private formBuilder:FormBuilder,private _authService:AuthService,private _userService:UserService , public notificationService:NotificationService) { }

  ngOnInit() {
    this.getInfo();
    this.updateForm = this.formBuilder.group({
      fname: [null, [Validators.required,Validators.pattern(GlobalContanst.persianRegex)]],
      lname: [null, [Validators.required,Validators.pattern(GlobalContanst.persianRegex)]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      postal_code : [null, [Validators.required]]
    });
  }

  getInfo(){
    var email = this._authService.getUserEmail();
    this._userService.getInfo(email).subscribe((res:any)=>{
      this.data = res;
      this.userId = res.id;
      console.log(this.userId);
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

  updateUserInformation(){
    var formData = this.updateForm.value;
    const data ={
      email: this.data.email,
      fname: formData.fname,
      lname: formData.lname,
      password : formData.password,
      phone_number: formData.phone_number,
      address : formData.address,
      postal_code: formData.postal_code,
    }
    this._userService.update(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.getInfo();
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

}
