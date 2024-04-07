import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step1',
  templateUrl: './prefs-step1.component.html',
  styleUrls: [
    './prefs-step1.component.scss',
    '../../profile-common-styles.scss',
  ],
})
export class PrefsStep1Component implements OnInit {
  formGroup: FormGroup;
  
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    public accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [this.accountService.loggedUserValue.firstName, Validators.required],
      lastName: [this.accountService.loggedUserValue.lastName, Validators.required],
      emailAddress: [{ value: this.accountService.loggedUserValue.email, disabled: true }, [Validators.required, Validators.email]],
      gender: [this.accountService.loggedUserValue.gender, Validators.required],
      age: [this.accountService.loggedUserValue.age, Validators.required],
      height: [this.accountService.loggedUserValue.height, Validators.required],
      weight: [this.accountService.loggedUserValue.weight, Validators.required],
      bms: [{ value: this.accountService.loggedUserValue.bms, disabled: true }, Validators.required]
    });
    }

  goHome() {
    this.router.navigate(['/profile']);
  }

  goNext() {
    this.router.navigate(['/profile/preferences-step-7']);
  }

  updateUserProfile() {}
}
