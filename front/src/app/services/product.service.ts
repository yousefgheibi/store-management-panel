import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  add(data:any){
    return this.httpClient.post(this.url+'/product/add',data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/product/update',data);
  }


  getproduct() {
    return this.httpClient.get(this.url + "/product/get/");
  }


  delete(id:number){
    return this.httpClient.delete(this.url + "/product/delete/" + id);
  }
}
