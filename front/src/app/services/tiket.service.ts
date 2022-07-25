import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiketService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+'/tiket/add',data);
  }

  gettiket(email: string){
    return this.httpClient.get(this.url + "/tiket/get/" + email);
  }


  deletetiket(id:number){
    return this.httpClient.delete(this.url + "/tiket/delete/" + id);
  }
}