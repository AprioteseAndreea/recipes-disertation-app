import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step7',
  templateUrl: './prefs-step7.component.html',
  styleUrls: [
    './prefs-step7.component.scss',
    '../../profile-common-styles.scss',
  ],
})
export class PrefsStep7Component implements OnInit{
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      coockingLevel: [
        this.accountService.loggedUserValue.cookingLevel,
      ],
    });
  }

  goHome() {
    this.router.navigate(['/profile']);
  }

  updateCookingLevel() {
    const updatedUserObj: UserDto = {
      cookingLevel: this.formGroup.get('coockingLevel').value,
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
