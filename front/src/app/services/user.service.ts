import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getInfo(email:string){
    return this._http.get(this.url + "/user/getInfo/"+ email);
  }

  update(data:any){
    return this._http.patch(this.url+'/user/update',data);
  }
}
