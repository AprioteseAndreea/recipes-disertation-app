import { Component } from '@angular/core';
import constants from 'src/app/core/constants/constants';
import { UserDto } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = constants.User;
  loggedUser: UserDto;
  colors = constants.Colors;

  constructor(public accountService: AccountService){
    this.loggedUser = this.accountService.loggedUserValue;
  }
  
}
