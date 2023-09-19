import { Component } from '@angular/core';
import constants from 'src/app/core/constants/constants';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = constants.User;
  loggedUser: User;
  colors = constants.Colors;

  constructor(public authService: AuthService){
    this.loggedUser = this.authService.userData;
  }
}
