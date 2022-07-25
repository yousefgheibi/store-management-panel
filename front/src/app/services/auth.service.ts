import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url = environment.apiUrl;
  constructor(private _http:HttpClient) { 
  }

  login(data:any){
    return this._http.post(this.url+'/user/login',data,{
      headers : new HttpHeaders().set('Content-Type','application/json')
    })
  }

  isLogined(){
    return localStorage.getItem('token') !=null;
  
  }

  getUserEmail(){
    let obj:{email,exp,iat} = jwt_decode(localStorage.getItem('token'));
    return obj.email;
  }

  
}
