import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step5',
  templateUrl: './prefs-step5.component.html',
  styleUrls: [
    './prefs-step5.component.scss',
    '../../profile-common-styles.scss',
  ],
})
export class PrefsStep5Component implements OnInit {
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      physicalEffort: [
        this.accountService.loggedUserValue.physicalEffort,
        Validators.required,
      ],
    });
  }

  goHome() {
    this.router.navigate(['/profile']);
  }

  calculatePhysicalEffortFactor(): number {
    const physicalEffort = this.formGroup.get('physicalEffort').value;
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

  calculateBmr(){
    var bmr;

    const weight = this.accountService.loggedUserValue.weight;
    const height = this.accountService.loggedUserValue.height;
    const age = this.accountService.loggedUserValue.age;
    const physicalEffortFactor = this.calculatePhysicalEffortFactor();

    if (this.accountService.loggedUserValue.gender == 'F') {

      bmr = (10 * weight) + (6.25 * height) - (5 * age + 5);
      bmr *= physicalEffortFactor;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      bmr *= physicalEffortFactor;
    }

    bmr = Math.floor(bmr);

    return bmr;
  }
  
  updatePhysicalEffort() {
    const updatedUserObj: UserDto = {
      physicalEffort: this.formGroup.get('physicalEffort').value,
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

        this.accountService.loggedUserValue.bmr = this.calculateBmr();
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
