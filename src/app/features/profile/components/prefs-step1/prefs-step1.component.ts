import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-prefs-step1',
  templateUrl: './prefs-step1.component.html',
  styleUrls: [
    './prefs-step1.component.scss',
    '../../profile-common-styles.scss',
  ],
})
export class PrefsStep1Component {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}
  goHome() {
    this.router.navigate(['/profile']);
  }

  goNext() {
    this.router.navigate(['/profile/preferences-step-7']);
  }
}
