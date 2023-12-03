import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-prefs-step7',
  templateUrl: './prefs-step7.component.html',
  styleUrls: ['./prefs-step7.component.scss', "../../profile-common-styles.scss"],
})
export class PrefsStep7Component {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}
  goBack() {
    this.router.navigate(['/profile/preferences-step-1']);
  }

  goNext(){
    this.router.navigate(['/profile/preferences-step-5']);
  }
}
