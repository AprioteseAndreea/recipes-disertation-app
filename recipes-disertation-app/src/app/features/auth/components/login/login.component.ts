import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthStore } from 'src/app/core/store/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    // if (this.form.invalid) {
    //   return;
    // }
    // this.router.navigateByUrl("dashboard");

    // this.auth.login(val.username, val.password).subscribe({
    //   next: () => {
        this.router.navigateByUrl('/home');
    //   },
    //   error: () => {
    //     alert('Login failed!');
    //   },
    // });
  }
}
