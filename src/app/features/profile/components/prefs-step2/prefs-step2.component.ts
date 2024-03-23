import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import constants from 'src/app/core/constants/constants';
import { UserCuisine } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-prefs-step2',
  templateUrl: './prefs-step2.component.html',
  styleUrls: ['./prefs-step2.component.scss', "../../profile-common-styles.scss"]
})
export class PrefsStep2Component {
  
  userCuisines: UserCuisine[];
  userCuisinesSubscription: Subscription;

  allCuisines =  constants.Cuisines;
  selectedCuisines: UserCuisine[];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    public accountService: AccountService
  ) {
    this.userCuisinesSubscription = this.accountService.loggedUser$.subscribe(data => {
      this.userCuisines = data.userCuisines;
      this.selectedCuisines = [...this.userCuisines];
    });
  }
  goHome() {
    this.router.navigate(['/profile']);
  }

  updateCuisines() {
    this.accountService
      .updateCuisines(this.selectedCuisines)
      .subscribe({
        next: () => {
          this.accountService.updateLoggedUserCuisines(this.selectedCuisines);

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
 
  isSelected(cuisineName: string): boolean {
    return this.userCuisines.some(cuisine => cuisine.name === cuisineName);
  }
  
  updateList(cuisineName: string) {
    const index = this.selectedCuisines.findIndex(cuisine => cuisine.name === cuisineName);
  
    if (index !== -1) {
      this.selectedCuisines.splice(index, 1);
    } else {
      const cuisine = this.allCuisines.find(cuisine => cuisine.name === cuisineName);
      if (cuisine) {
        this.selectedCuisines.push({id: cuisine.id, name: cuisine.name});
      }
    }
  }
  
  ngOnDestroy(): void {
    this.userCuisinesSubscription.unsubscribe();
  }

}
