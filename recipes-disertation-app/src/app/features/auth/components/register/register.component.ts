import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthStore } from 'src/app/core/store/auth.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore,
    private alertService: NotificationService
  ) {
    this.form = this.fb.group({
      username: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]],
      confirmPassword: ['test', [Validators.required]],
    });
  }

  ngOnInit() {}
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    //this.alertService.clear();
    const val = this.form.value;
    if (this.form.invalid) {
      return;
    }else{
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
}
