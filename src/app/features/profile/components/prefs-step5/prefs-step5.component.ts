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
