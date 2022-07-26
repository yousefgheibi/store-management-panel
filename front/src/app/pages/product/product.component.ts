import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  dataSource:any;
  isWait : boolean = false;
  searchKey : string | undefined;
  showAdd !:boolean;
  showEdit !:boolean;
  productId !: number;
  data: any;
  responseMessage:any;
  AddProductForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private formBuilder: FormBuilder, private _authService:AuthService, private _productService :ProductService  , public notificationService : NotificationService) { }

  ngOnInit(): void {

    this.AddProductForm = this.formBuilder.group({
      code: [null, [Validators.required]],
      category: [null, [Validators.required]],
      name: [null, [Validators.required]],
      bprice: [null, [Validators.required]],
      sprice: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      stock: [null, [Validators.required]]
    });

    this.tableData();
  }

  tableData(){
    var email = this._authService.getUserEmail();
    this._productService.getproduct(email).subscribe((res:any)=>{
      this.data = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  
  }


  clicktoAddProduct(){
    this.showAdd = true;
    this.showEdit = false;
    this.AddProductForm.reset();
  }


  addProduct(){
    var formData = this.AddProductForm.value;
    var email = this._authService.getUserEmail();
    const data ={
      code: formData.code,
      user_email:  email,
      category: formData.category,
      name: formData.name,
      unit: formData.unit,
      bprice: formData.bprice,
      sprice: formData.sprice,
      stock: formData.stock
    }

    this._productService.add(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
    
  }


  editProduct(item : any){
    this.showAdd = false;
    this.showEdit = true;
    this.productId = item.id;
    this.AddProductForm.controls['code'].setValue(item.code);
    this.AddProductForm.controls['category'].setValue(item.category);
    this.AddProductForm.controls['name'].setValue(item.name);
    this.AddProductForm.controls['unit'].setValue(item.unit);
    this.AddProductForm.controls['bprice'].setValue(item.bprice);
    this.AddProductForm.controls['sprice'].setValue(item.sprice);
    this.AddProductForm.controls['stock'].setValue(item.stock);
  }

  EditProductPost(){
    var formData = this.AddProductForm.value;
    const data ={
      id : this.productId, 
      code: formData.code,
      category: formData.category,
      name: formData.name,
      unit: formData.unit,
      bprice: formData.bprice,
      sprice: formData.sprice,
      stock: formData.stock
    }
    this._productService.update(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.AddProductForm.reset();
      this.notificationService.showSuccess(this.responseMessage);
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }


  deleteProduct(id: number){
    let c = confirm("آیا از حذف کردن این محصول مطمئن هستید ؟");
    if (c) {
      this._productService.delete(id).subscribe((res:any)=>{
        this.notificationService.showSuccess(" با موفقیت حذف شد!");
        this.tableData();
   
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }
}


doSearch(searchKey : string) {
  let result = [];
  if(searchKey.length > 2) {
    result = this.data.filter((item: { name: string; }) => {
      // @ts-ignore
      return !(item.name.trim().indexOf(this.searchKey.trim()) <= -1);
    });
  }
  if(result.length > 0 ){
    this.data= result;
  }
  else{
      this.tableData();
  }
}

}
