import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-prefs-step2',
  templateUrl: './prefs-step2.component.html',
  styleUrls: ['./prefs-step2.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep2Component {
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
