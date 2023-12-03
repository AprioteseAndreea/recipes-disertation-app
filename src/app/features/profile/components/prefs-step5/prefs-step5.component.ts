import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-prefs-step5',
  templateUrl: './prefs-step5.component.html',
  styleUrls: ['./prefs-step5.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep5Component {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}
  goBack(){
    this.router.navigate(['/profile/preferences-step-7']);
  }
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
