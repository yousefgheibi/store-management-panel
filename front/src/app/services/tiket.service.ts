import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SupportModel } from '../models/support.model';

@Injectable({
  providedIn: 'root'
})
export class TiketService {

  url = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  add(data:SupportModel){
    return this._http.post(this.url+'/tiket/add',data);
  }

  gettiket(email: string){
    return this._http.get(this.url + "/tiket/get/" + email);
  }


  deletetiket(id:number){
    return this._http.delete(this.url + "/tiket/delete/" + id);
  }
}