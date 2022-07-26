import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  add(data:any){
    return this.httpClient.post(this.url+'/people/add',data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/people/update',data);
  }


  getpeople(email: string) {
    return this.httpClient.get(this.url + "/people/get/"+ email);
  }

  getpeopleById(id: number) {
    return this.httpClient.get(this.url + "/people/getById/" + id);
  }


  delete(id:number){
    return this.httpClient.delete(this.url + "/people/delete/" + id);
  }
}
