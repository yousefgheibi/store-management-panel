import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IncomeModel } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  url = environment.apiUrl;
  constructor(private _http : HttpClient) { }


  add(data:IncomeModel){
    return this._http.post(this.url+'/financial/add',data);
  }

  update(data:IncomeModel){
    return this._http.patch(this.url+'/financial/update',data);
  }


  getfinancial(email: string) {
    return this._http.get(this.url + "/financial/get/"+ email);
  }

  delete(id:number){
    return this._http.delete(this.url + "/financial/delete/" + id);
  }
}
 