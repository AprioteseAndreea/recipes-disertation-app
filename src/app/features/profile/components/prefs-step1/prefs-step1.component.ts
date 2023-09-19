import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step1',
  templateUrl: './prefs-step1.component.html',
  styleUrls: ['./prefs-step1.component.scss', "../prefs-step7/prefs-step7.component.scss"],
})
export class PrefsStep1Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/profile/preferences-step-2']);
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
