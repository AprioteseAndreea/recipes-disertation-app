import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-prefs-step6',
  templateUrl: './prefs-step6.component.html',
  styleUrls: ['./prefs-step6.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep6Component {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}
  goHome() {
    this.router.navigate(['/profile']);
  }

  save() {
    //salveaza informatii
    this.notificationService.showSuccess(
      'Success!',
      'Your informations was saved!'
    );
    this.goHome();
  }
}
