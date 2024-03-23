import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step6',
  templateUrl: './prefs-step6.component.html',
  styleUrls: ['./prefs-step6.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep6Component {
  selectedGoals: boolean[];
  userSelections: boolean[];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    public accountService: AccountService
  ) {
    this.accountService.loggedUser$.subscribe(data => {
      this.userSelections = [
        data.wantToLearnNewSkills,
        data.wantToTryNewCuisines,
        data.wantToSaveTime,
        data.wantToSaveMoney,
        data.wantToEatHealthy
      ];
      this.selectedGoals = [...this.userSelections];
    });
  }
  goHome() {
    this.router.navigate(['/profile']);
  }

 updateUserSelection(index: number){
  this.selectedGoals[index] = !this.selectedGoals[index];
 }

 checkSelection(index: number){
  return this.userSelections[index];
 }

  updateGoals() {
    console.log(this.selectedGoals)
    this.accountService
      .updateUserGoals(this.selectedGoals)
      .subscribe({
        next: () => {
          this.accountService.updateLoggedUserGoals(this.selectedGoals);

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
