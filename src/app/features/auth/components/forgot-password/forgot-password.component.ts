import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  
  public form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
  });
  loading = false;

  constructor(private router: Router, public authService: AuthService) {}

  isNotValid(): boolean {
    return !this.form.controls.username.valid;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.authService.ForgotPassword(this.form.controls.username.value);
      this.router.navigateByUrl('login');
    }
  }
}
