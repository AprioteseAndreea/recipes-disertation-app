import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import constants from 'src/app/core/constants/constants';
import { UserDiet } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step3',
  templateUrl: './prefs-step3.component.html',
  styleUrls: ['./prefs-step3.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep3Component {
  userDiets: UserDiet[];
  userDietsSubscription: Subscription;

  allDiets =  constants.Diets;
  selectedDiets: UserDiet[];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    public accountService: AccountService

  ) {
    this.userDietsSubscription = this.accountService.loggedUser$.subscribe(data => {
      this.userDiets = data.userDiets;
      this.selectedDiets = [...this.userDiets];
    });
  }
  goHome() {
    this.router.navigate(['/profile']);
  }

  updateDiets() {
    this.accountService
      .updateDiets(this.selectedDiets)
      .subscribe({
        next: () => {
          this.accountService.updateLoggedUserDiets(this.selectedDiets);

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

  isSelected(dietName: string): boolean {
    return this.userDiets.some(diet => diet.name === dietName);
  }
  
  updateList(dietName: string) {
    const index = this.selectedDiets.findIndex(diet => diet.name === dietName);
  
    if (index !== -1) {
      this.selectedDiets.splice(index, 1);
    } else {
      const diet = this.allDiets.find(diet => diet.name === dietName);
      if (diet) {
        this.selectedDiets.push({id: diet.id, name: diet.name});
      }
    }
  }
  
  ngOnDestroy(): void {
    this.userDietsSubscription.unsubscribe();
  }
}
