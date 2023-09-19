import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step6',
  templateUrl: './prefs-step6.component.html',
  styleUrls: ['./prefs-step6.component.scss', "../prefs-step7/prefs-step7.component.scss"]
})
export class PrefsStep6Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/profile/preferences-step-7']);
  }
  goBack() {
    this.router.navigate(['/profile/preferences-step-5']);
  }
}
