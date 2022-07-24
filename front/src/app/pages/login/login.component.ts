import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm !: FormGroup;
  isShowDashboard: Boolean = false;
  user_id !: number;
  signupForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  responseMessage!: string;
  url = environment.apiUrl;
  constructor(private formbuilder: FormBuilder, private authService : AuthService,private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group(
     {
      email: [null, [Validators.required, Validators.pattern(GlobalContanst.emailRegex)]],
      password: [null, [Validators.required]]
     }
    )
  }

  login(){
      var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.authService.login(data).subscribe((res: any) => {
      this.responseMessage = res?.message;
      this.user_id = res?.id;
      localStorage.setItem('token', res.token);
      this.notificationService.showSuccess(this.responseMessage);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    }
    )
    }





    // this._http.get<any>('http://localhost:8080/user/login').subscribe(res=>{
    //   const user = res.find((a:any)=>{
    //     return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
    //   })

    //   if(user){
    //     alert("logined");
    //     this.loginForm.reset();
    //     this.router.navigate(['dashboard']);
    //   }
    //   else{
    //     alert('User Not Found !!')
    //   }
    // })
  
  ngOnDestroy() {
  }

}
