import { Component, OnInit } from '@angular/core';
import constants from 'src/app/core/constants/constants';
import { environment } from 'src/app/core/environments/environment';
import { UserDto, UserRecommendation } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';

declare function favoriteAnimation($event: any): void;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: UserDto | null;
  weekDays: Date[];
  selectedDay: Date;
  dailyTotalCalories: number;

  recipesLabel: string;
  recommendedRecipes: UserRecommendation[];

  recipes = constants.Recipes;

  constructor(
    private accountService: AccountService,
    public authService: AuthService,
    public userService: UserService,
    private notificationService: NotificationService,
  ) {
    this.authService.fetchUserData(false);

    this.user = this.accountService.loggedUserValue;
    this.weekDays = this.getNext7Days();

    const today = new Date();

    this.recipesLabel = 'Today meels';
    this.recommendedRecipes = this.user.userRecommendations.filter(
      (rec) =>
        new Date(rec.dateTime).toLocaleDateString('en-GB') ===
        today.toLocaleDateString('en-GB')
    );
    this.dailyTotalCalories = this.recommendedRecipes.reduce((sum, rec) => {
      return sum + (rec.breakfastRecipe.kcals + rec.lunchRecipe.kcals + rec.dinnerRecipe.kcals);
    }, 0);
  }

  getNext7Days(): Date[] {
    const today = new Date();
    const next7Days = [];

    const dayOfWeek = today.getDay();

    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysToSubtract + i);
      next7Days.push(date);
    }
    return next7Days;
  }

  favoriteAnimation($event: any) {
    favoriteAnimation($event);
  }

  getImageUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  getRecommendationByDay(date: Date) {
    this.selectedDay = date;

    const currentDate: Date = new Date();
    const anotherDate: Date = new Date(date);

    if (currentDate.getDate() !== anotherDate.getDate()) {
      this.recipesLabel = anotherDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
      });
    } else {
      this.recipesLabel = 'Today meels';
    }

    this.recommendedRecipes = this.user.userRecommendations.filter(
      (rec) =>
        new Date(rec.dateTime).toLocaleDateString('en-GB') ===
        date.toLocaleDateString('en-GB')
    );

    this.dailyTotalCalories = this.recommendedRecipes.reduce((sum, rec) => {
      return sum + (rec.breakfastRecipe.kcals + rec.lunchRecipe.kcals + rec.dinnerRecipe.kcals); // Adaugă caloriile rețetei la suma totală
    }, 0);
  }

  generateNewMenu() {
    this.accountService.generateNewMenu().subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Success!',
          'Your menu was successfully generated!'
        );
      },
      error: (e) => {
        console.log(e);
        this.notificationService.showError(
          'Error!',
          'Your menu wasn\'t successfully generated'
        );
      },
    });
  }

  logOut() {
    this.authService.SignOut();
  }
}
