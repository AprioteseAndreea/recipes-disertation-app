import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step3',
  templateUrl: './prefs-step3.component.html',
  styleUrls: ['./prefs-step3.component.scss', "../prefs-step7/prefs-step7.component.scss"]
})
export class PrefsStep3Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/profile/preferences-step-4']);
  }
  goBack() {
    this.router.navigate(['/profile/preferences-step-2']);
  }
}
