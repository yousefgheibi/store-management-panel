import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  generateReport(data: any) {
    return this._http.post(this.url + '/bill/generateReport/', data);
  }

  getPdf(data: any): Observable<Blob> {
    return this._http.post(this.url + '/bill/getPdf', data, { responseType: 'blob' });
  }

  getBills(email:string) {
    return this._http.get(this.url + '/bill/getBills/'+email);
  }

  getFactor_size(email:string){
    return this._http.get(this.url + "/bill/getSize/"+ email);
  }
  
  delete(id: any) {
    return this._http.delete(this.url + '/bill/delete/' + id);
  }
}
