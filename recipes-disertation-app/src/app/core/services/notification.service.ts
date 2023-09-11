import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private toastr: ToastrService) {
  }

  showSuccess(title: string, message?: string) {
    console.log("In showSuccess")
    this.toastr.success(message, title);
  }

  showError(title: string, message?: string) {
    this.toastr.error(message, title,
      {timeOut: 7000});
  }

  showWarning(title: string, message?: string) {
    this.toastr.warning(message, title);
  }

  showInfo(title: string, message?: string) {
    this.toastr.info(message, title);
  }
}
