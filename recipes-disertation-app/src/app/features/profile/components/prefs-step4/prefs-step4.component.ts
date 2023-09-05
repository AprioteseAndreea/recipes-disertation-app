import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step4',
  templateUrl: './prefs-step4.component.html',
  styleUrls: ['./prefs-step4.component.scss', "../prefs-step7/prefs-step7.component.scss", "../prefs-step3/prefs-step3.component.scss"]
})
export class PrefsStep4Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/profile/preferences-step-5']);
  }
  goBack() {
    this.router.navigate(['/profile/preferences-step-3']);
  }
}
