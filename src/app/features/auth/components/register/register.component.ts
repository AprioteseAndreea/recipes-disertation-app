import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true,
        }),
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true,
        }),
        CustomValidators.patternValidator(
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true,
          }
        ),
        CustomValidators.patternValidator(/^\S*$/, {
          hasEmptySpaces: true,
        }),
        Validators.minLength(8),
      ])
    ),
    repeteadPassword: new FormControl('', [Validators.required]),
    acceptedTerms: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  isNotValid(): boolean {
    return !(
      this.form.controls.email.valid &&
      this.form.controls.password.valid &&
      this.form.controls.repeteadPassword.valid &&
      this.form.controls.acceptedTerms.valid &&
      this.form.controls.password.value ==
        this.form.controls.repeteadPassword.value
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.authService.SignUp(
        this.form.controls.email.value,
        this.form.controls.password.value
      );
    }
  }
}
