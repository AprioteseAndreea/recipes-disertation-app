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
      firstName: [
        this.accountService.loggedUserValue.firstName,
        Validators.required,
      ],
      lastName: [
        this.accountService.loggedUserValue.lastName,
        Validators.required,
      ],
      emailAddress: [
        { value: this.accountService.loggedUserValue.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      gender: [this.accountService.loggedUserValue.gender, Validators.required],
      age: [this.accountService.loggedUserValue.age, Validators.required],
      height: [this.accountService.loggedUserValue.height, Validators.required],
      weight: [this.accountService.loggedUserValue.weight, Validators.required],
      bmr: [
        { value: this.accountService.loggedUserValue.bmr, disabled: true },
        Validators.required,
      ],
    });
  }

  goHome() {
    this.router.navigate(['/profile']);
  }

  goNext() {
    this.router.navigate(['/profile/preferences-step-7']);
  }

  calculatePhysicalEffortFactor(): number {
    const physicalEffort = this.accountService.loggedUserValue.physicalEffort;
    let physicalEffortFactor: number;

    switch (physicalEffort) {
      case 'SEDENTARY':
        physicalEffortFactor = 1.2;
        break;
      case 'SLIGHTLY_ACTIVE':
        physicalEffortFactor = 1.375;
        break;
      case 'MODERATELY_ACTIVE':
        physicalEffortFactor = 1.55;
        break;
      case 'VERY_ACTIVE':
        physicalEffortFactor = 1.725;
        break;
      case 'SUPER_ACTIVE':
        physicalEffortFactor = 1.9;
        break;
      default:
        physicalEffortFactor = 1.0;
        break;
    }

    return physicalEffortFactor;
  }

  onFocusOut(event: any) {
    this.formGroup.get('bmr').setValue(this.calculateBmr());
  }

  onRadioChange(event: any) {
    this.formGroup.get('bmr').setValue(this.calculateBmr());
  }

  calculateBmr(){
    var bmr;

    const weight = this.formGroup.get('weight').value;
    const height = this.formGroup.get('height').value;
    const age = this.formGroup.get('age').value;
    const physicalEffortFactor = this.calculatePhysicalEffortFactor();

    if (this.formGroup.get('gender').value == 'F') {

      bmr = (10 * weight) + (6.25 * height) - (5 * age + 5);
      bmr *= physicalEffortFactor;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      bmr *= physicalEffortFactor;
    }

    bmr = Math.floor(bmr);

    return bmr;
  }

  updateUserProfile() {
    const bmr = this.calculateBmr();

    const updatedUserObj: UserDto = {
      firstName: this.formGroup.get('firstName').value,
      lastName: this.formGroup.get('lastName').value,
      age: this.formGroup.get('age').value,
      height: this.formGroup.get('height').value,
      weight: this.formGroup.get('weight').value,
      bmr: bmr,
      gender: this.formGroup.get('gender').value,
    };

    this.accountService
    .updateUser(updatedUserObj)
    .subscribe({
      next: () => {
        this.accountService.updateUser(updatedUserObj);

        this.notificationService.showSuccess(
          'Success!',
          'Your informations was saved!'
        );
        this.goHome();
      },
      error: (e) => {
        console.log(e);
        this.notificationService.showError(
          'Error!',
          'The item cannot be updated!'
        );
      },
    });
  }
}
