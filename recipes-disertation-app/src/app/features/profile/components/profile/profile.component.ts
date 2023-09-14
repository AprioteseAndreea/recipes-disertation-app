import { Component } from '@angular/core';
import constants from 'src/app/core/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = constants.User;
  colors = constants.Colors;
}
