import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;
  constructor(private _http: HttpClient) { }
  add(data:any){
    return this._http.post(this.url+'/product/add',data);
  }

  update(data:any){
    return this._http.patch(this.url+'/product/update',data);
  }

  getproduct(email:string) {
    return this._http.get(this.url + "/product/get/" + email);
  }

  getProductsById(id: any){
    return this._http.get(this.url + '/product/getById/'+ id);
  }
  getKhadamat(email:string) {
    return this._http.get(this.url + "/product/getKhadamat/" + email);
  }

  getKala(email:string) {
    return this._http.get(this.url + "/product/getKala/" + email);
  }

  getProduct_size(email:string){
    return this._http.get(this.url + "/product/getSize/"+ email);
  }

  delete(id:number){
    return this._http.delete(this.url + "/product/delete/" + id);
  }
}
