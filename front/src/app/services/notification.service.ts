import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toster : ToastrService) { }

  showSuccess(message : string){
    this.toster.success(message);
  }

  showError(message: string) {
    this.toster.error(message);
  }
  
}
