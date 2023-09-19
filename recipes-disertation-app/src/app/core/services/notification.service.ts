import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
   toastClass = {
    timeOut: 7000,
    progressBar: true,
    titleClass: "small",
  }
  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, message?: string) {
    console.log('In showSuccess');
    this.toastr.success(message, title, this.toastClass);
  }

  showError(title: string, message?: string) {
    this.toastr.error(message, title, this.toastClass);
  }

  showWarning(title: string, message?: string) {
    this.toastr.warning(message, title, this.toastClass);
  }

  showInfo(title: string, message?: string) {
    this.toastr.info(message, title, this.toastClass);
  }
}
