import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authController: AuthenticationController,
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    if (username && password && this.loginForm.valid) {
      this.loginForm.disable();
      this.authController
        .login(username, password)
        .pipe(
          tap((response) => {
            console.log(response);
          }),
          catchError(() => {
            this.loginForm.enable();
            return of(null);
          }),
        )
        .subscribe({});
    }
  }
}
