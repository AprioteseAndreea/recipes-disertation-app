import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';
import { Ingredient, UserIngredient } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { FridgeService } from 'src/app/features/fridge/modals/add-item-component/fridge.service';

@Component({
  selector: 'app-prefs-step4',
  templateUrl: './prefs-step4.component.html',
  styleUrls: ['./prefs-step4.component.scss', "../../profile-common-styles.scss", "../prefs-step3/prefs-step3.component.scss"]
})
export class PrefsStep4Component {
  userIngredients: UserIngredient[];
  userIngredientsSubscription: Subscription;

  ingredients: Ingredient[];
  selectedIngredients: UserIngredient[];
  
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private fridgeService: FridgeService,
    public accountService: AccountService

  ) {
    this.fridgeService.getAllIngredients().subscribe((res) => {
      this.ingredients = res;
      console.log(this.ingredients)
    });

    this.userIngredientsSubscription = this.accountService.loggedUser$.subscribe(data => {
      this.userIngredients = data.userDislikedIngredients;
      this.selectedIngredients = [...this.userIngredients];
    });

  }
  goHome() {
    this.router.navigate(['/profile']);
  }

  updateIngredients() {
    this.accountService
      .updateUserDislikedIngredients(this.selectedIngredients)
      .subscribe({
        next: () => {
          this.accountService.updateLoggedUserDislikedIngedients(this.selectedIngredients);

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

  isSelected(ingrId: number): boolean {
    return this.userIngredients.some(ingr => ingr.id === ingrId);
  }
  
  updateList(ingrId: number) {
    const index = this.selectedIngredients.findIndex(ingr => ingr.id === ingrId);
  
    if (index !== -1) {
      this.selectedIngredients.splice(index, 1);
    } else {
      const ingredient = this.ingredients.find(ingr => ingr.id === ingrId);
      if (ingredient) {
        this.selectedIngredients.push(ingredient);
      }
    }
  }
  
  ngOnDestroy(): void {
    this.userIngredientsSubscription.unsubscribe();
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }
}
