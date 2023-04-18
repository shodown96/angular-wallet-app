import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notify = (title:string, message:string = "") => {
    this.toastr.show(title, message,{
      positionClass:"toast-top-right",
      closeButton:true
    })
  }
  constructor(private toastr: ToastrService) { }
}
