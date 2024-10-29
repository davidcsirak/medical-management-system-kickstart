import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { RoleEnum } from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private authController: AuthenticationController,
    private rotuer: Router,
  ) {}

  get username() {
    return this.loginForm.get('username');
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
          tap((res) => {
            if (res.role === RoleEnum.ROLE_ADMIN) {
              this.rotuer.navigate([UrlEnum.USER]);
            } else {
              this.rotuer.navigate([UrlEnum.PATIENT]);
            }
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
