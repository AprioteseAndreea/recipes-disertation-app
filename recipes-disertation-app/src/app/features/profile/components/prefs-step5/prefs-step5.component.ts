import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step5',
  templateUrl: './prefs-step5.component.html',
  styleUrls: ['./prefs-step5.component.scss', "../prefs-step7/prefs-step7.component.scss"]
})
export class PrefsStep5Component {
  constructor(private router: Router) {}
  goNext() {
    this.router.navigate(['/preferences-step-6']);
  }
  goBack() {
    this.router.navigate(['/preferences-step-4']);
  }
}
