import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthStore } from 'src/app/core/store/auth.store';
import { CustomValidators } from './custom-validators';

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
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true,
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true,
        }),
        // check whether the entered password has a special character
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

  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore,
    private alertService: NotificationService
  ) {}

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

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
    this.submitted = true;
    //this.alertService.clear();
    const val = this.form.value;
    if (this.form.invalid) {
      return;
    } else {
      this.router.navigateByUrl('/home');
    }
    //this.router.navigateByUrl("dashboard");

    // this.auth.login(val.username, val.password).subscribe({
    //   next: () => {
    //   },
    //   error: () => {
    //     alert('Login failed!');
    //   },
    // });
  }
  togglePasswordVisibility(event: any) {
    const element = <HTMLInputElement>(
      document.getElementById("password")
    );
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
    const button = <HTMLButtonElement>event.target;

    if (button.classList.contains("fa-eye")) {
      button.setAttribute("title", "Ascunde parola");
      button.classList.remove("fa-eye");
      button.classList.add("fa-eye-slash");
    } else {
      button.setAttribute("title", "Arată parola");
      button.classList.remove("fa-eye-slash");
      button.classList.add("fa-eye");
    }
    event.preventDefault();
  }
  
}
