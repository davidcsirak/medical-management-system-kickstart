import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { UserController } from '../../controllers/user.controller';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  public RoleEnum = RoleEnum;

  public createUserForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userController: UserController,
  ) {}

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get role() {
    return this.createUserForm.get('role');
  }

  public onCreateUser() {
    if (this.username?.value && this.password?.value && this.role?.value) {
      this.userController
        .createUser(this.username.value, this.password.value, this.role.value as RoleEnum)
        .pipe(tap(() => this.router.navigate([UrlEnum.LOCATION])))
        .subscribe();
    }
  }
}
