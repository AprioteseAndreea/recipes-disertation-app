import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null;
  weekDays: Date[];

  constructor(private accountService: AccountService, ) {
      this.user = this.accountService.userValue;
      this.weekDays = this.getNext7Days();
      
  }

  getNext7Days(): Date[] {
    const today = new Date();
    const next7Days = [];
  
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)

    // Calculate the number of days to subtract to go back to the previous Monday
    const daysToSubtract = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysToSubtract + i);
    next7Days.push(date);
    }
    return next7Days;
  }
}
