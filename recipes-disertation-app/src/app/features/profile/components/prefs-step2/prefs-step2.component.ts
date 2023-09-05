import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step2',
  templateUrl: './prefs-step2.component.html',
  styleUrls: ['./prefs-step2.component.scss', "../prefs-step7/prefs-step7.component.scss"]
})
export class PrefsStep2Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/profile/preferences-step-3']);
  }
  goBack() {
    this.router.navigate(['/profile/preferences-step-1']);
  }
}
