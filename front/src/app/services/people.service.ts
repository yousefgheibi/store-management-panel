import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeopleModel } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  url = environment.apiUrl;
  constructor(private _http: HttpClient) { }
  add(data:PeopleModel){
    return this._http.post(this.url+'/people/add',data);
  }

  update(data:PeopleModel){
    return this._http.patch(this.url+'/people/update',data);
  }


  getpeople(email: string) {
    return this._http.get(this.url + "/people/get/"+ email);
  }

  getpeopleById(id: number) {
    return this._http.get(this.url + "/people/getById/" + id);
  }

  delete(id:number){
    return this._http.delete(this.url + "/people/delete/" + id);
  }

  getPeople_size(email:string){
    return this._http.get(this.url + "/people/getSize/"+ email);
  }
}
