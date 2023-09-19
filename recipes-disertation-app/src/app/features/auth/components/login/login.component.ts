import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('andreea.apriotese11@gmail.com', [
      Validators.required,
    ]),
    password: new FormControl('Concordia12#', [Validators.required]),
  });

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  isNotValid(): boolean {
    return !(
      this.form.controls.email.valid && this.form.controls.password.valid
    );
  }

  onSubmit() {
    const val = this.form.value;
    if (this.form.invalid) {
      return;
    } else {
      this.authService.SignIn(
        this.form.controls.email.value,
        this.form.controls.password.value
      );
    }
  }
}
