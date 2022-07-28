import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PersonServiceService } from 'src/app/services/person-service.service';
import { ProductService } from 'src/app/services/product.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
import {BillService} from '../../services/bill.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-new-factor',
  templateUrl: './new-factor.component.html',
  styleUrls: ['./new-factor.component.scss']
})
export class NewFactorComponent implements OnInit {
  price: any;
  productUnit : string;
  totalAmount = 0;
  people:any = [];
  productname: string;
  productCode: string;
  personName : string;
  productid: number;
  products: any = [];
  dataSource: any = [];
  data: any;
  responseMessage: string;
  AddFactorForm !: FormGroup;
  constructor(private _peopleService: PersonServiceService , private  _billService: BillService, private formBuilder: FormBuilder, private _productService: ProductService, private _authService: AuthService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPeople();
    this.AddFactorForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      typeFactor: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
      phone : [null,[Validators.required]],
      address : [null,[Validators.required]],
      description : [null]
    });
  }

  getPeople() {
    let email = this._authService.getUserEmail();
    this._peopleService.getpeople(email).subscribe((res: any) => {
      this.people = res;
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    });
  }

  getProductByCategory($event) {
    let email = this._authService.getUserEmail();
    if ($event.target.value == 'کالا') {
      this._productService.getKala(email).subscribe((res: any) => {
        this.products = res;
      }, (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = GlobalContanst.genericError;
        }
        this.notificationService.showError(this.responseMessage);
      });
    } else {
      this._productService.getKhadamat(email).subscribe((res: any) => {
        this.products = res;
      }, (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = GlobalContanst.genericError;
        }
        this.notificationService.showError(this.responseMessage);
      });
    }
  }

  getProductDetails(value: any) {
    // console.log($event.target);
    this._productService.getProductsById(value).subscribe((res: any) => {
      this.productname = res.name;
      this.productCode = res.code;
      this.price = res.price;
      this.productUnit = res.unit;
      this.productid = res.id;
      this.AddFactorForm.controls['price'].setValue(res.price);
      this.AddFactorForm.controls['stock'].setValue('1');
      this.AddFactorForm.controls['total'].setValue(this.price * 1);
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    });
  }


  getPersonDetails(value){
    this._peopleService.getpeopleById(value).subscribe((res: any) => {
      this.personName = res.name;
      this.AddFactorForm.controls['address'].setValue(res.address);
      this.AddFactorForm.controls['phone'].setValue(res.phone);
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    });
  }
 


  setQuantity(value: any) {
    let temp = this.AddFactorForm.controls['stock'].value;
    if (temp > 0) {
      this.AddFactorForm.controls['total'].setValue(this.AddFactorForm.controls['stock'].value * this.AddFactorForm.controls['price'].value);
    } else if (temp != '') {
      this.AddFactorForm.controls['stock'].setValue('1');
      this.AddFactorForm.controls['total'].setValue(this.AddFactorForm.controls['stock'].value * this.AddFactorForm.controls['price'].value);
    }
  }


  validateProductAdd() {
    if (this.AddFactorForm.controls['total'].value === 0 || this.AddFactorForm.controls['total'].value === null || this.AddFactorForm.controls['stock'].value <= 0) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    let formData = this.AddFactorForm.value;
    let productName = this.dataSource.find((e: {id: number; }) => e.id == this.productid);
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: this.productid,
        code : this.productCode,
        name: this.productname,
        unit: this.productUnit,
        stock: formData.stock,
        price: formData.price,
        total: formData.total
      });
      this.dataSource = [...this.dataSource];
    } else {
        this.responseMessage = GlobalContanst.addProductError;
        this.notificationService.showError(this.responseMessage);
      }
    }

    handleDelteAction(value: any, element: any) {
      this.totalAmount = this.totalAmount - element.total;
      this.dataSource.splice(value, 1);
      this.dataSource = [...this.dataSource];
    }

  validateSubmit() {
    if (this.totalAmount === 0 || this.AddFactorForm.controls['name'].value === null ) {
      return true;
    } else {
      return false;
    }
  }

  submitAction() {
    let formData = this.AddFactorForm.value;
    let email = this._authService.getUserEmail();
    let data = {
      name: this.personName,
      typeFactor: formData.typeFactor,
      paymentMethod: formData.paymentMethod,
      total: this.totalAmount,
      description : formData.description,
      phone : formData.phone,
      address : formData.address,
      productDetails: JSON.stringify(this.dataSource),
      email : email
    };

    this._billService.generateReport(data).subscribe((res: any) => {
      this.downloadFile(res?.uuid);
      this.AddFactorForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
      this.responseMessage = res.message;
      this.notificationService.showSuccess(this.responseMessage);
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    });
  }

  downloadFile(fileName:any){
    var data = {
      uuid:fileName
    }

    this._billService.getPdf(data).subscribe((res:any)=>{
      saveAs(res,fileName+'.pdf');
      // this.router.navigate(['file:///D:/Project/self/Cafe-Management-System/backend/generated_pdf/'+data.uuid +'.pdf'])
      
    })

}
  
  }
