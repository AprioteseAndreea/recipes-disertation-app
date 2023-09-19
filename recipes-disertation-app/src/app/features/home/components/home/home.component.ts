import { Component } from '@angular/core';
import constants from 'src/app/core/constants/constants';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

declare function favoriteAnimation($event: any): void;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User | null;
  weekDays: Date[];

  recipes = constants.Recipes;
  
  constructor(private accountService: AccountService,   public authService: AuthService) {
    this.user = this.accountService.userValue;
    this.weekDays = this.getNext7Days();
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

  logOut(){
    this.authService.SignOut();
  }

}
