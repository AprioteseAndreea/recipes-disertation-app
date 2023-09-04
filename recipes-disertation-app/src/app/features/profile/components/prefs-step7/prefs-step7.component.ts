import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prefs-step7',
  templateUrl: './prefs-step7.component.html',
  styleUrls: [
   
    './prefs-step7.component.scss',
    
  ],
})
export class PrefsStep7Component {
  constructor(private router: Router) {}
  saveData() {
    this.router.navigate(['/']);
  }
  goBack() {
    this.router.navigate(['/preferences-step-6']);
  }
}
