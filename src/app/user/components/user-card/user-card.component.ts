import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { UserController } from '../../controllers/user.controller';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { tap } from 'rxjs';
import { ChangeTypeEnum } from '../../../shared/enums/change-type.enum';
import { checkUsername } from '../../../shared/utils/async-validators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {
  @ViewChild('myForm') myFormDirective!: FormGroupDirective;

  public RoleEnum = RoleEnum;

  public ChangeTypeEnum = ChangeTypeEnum;

  public changeType!: ChangeTypeEnum;

  public routeId?: string;

  public title!: string;

  public createUserForm = this.fb.group({
    username: ['', [Validators.required], [checkUsername()]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userController: UserController,
    private route: ActivatedRoute,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id') ?? undefined;
  }
  ngOnInit(): void {
    if (!this.routeId || this.router.url.includes('new')) {
      this.changeType = ChangeTypeEnum.CREATE;
      this.title = 'Felhasználó létrehozása';
      return;
    } else {
      this.changeType = ChangeTypeEnum.EDIT;
      this.createUserForm.controls.username.disable();
      this.createUserForm.controls.role.disable();
      this.title = 'Felhasználó szerkesztése';
    }
    this.loadUserData();
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get role() {
    return this.createUserForm.get('role');
  }

  private loadUserData() {
    this.userController
      .getUser(this.routeId!)
      .pipe(tap((res) => this.createUserForm.patchValue(res)))
      .subscribe();
  }

  public onCreateUser() {
    if (this.username?.value && this.password?.value && this.role?.value) {
      this.userController
        .createUser(this.username.value, this.password.value, this.role.value as RoleEnum)
        .pipe(tap((res) => this.router.navigate([UrlEnum.USER, res.id, UrlEnum.EDIT])))
        .subscribe();
    }
  }

  public onEditUser() {
    this.router.navigate([UrlEnum.USER, this.routeId, UrlEnum.EDIT]);
  }

  public onDeleteUser() {
    if (this.routeId) {
      this.userController
        .deleteUser(this.routeId)
        .pipe(tap(() => this.router.navigate([UrlEnum.USER])))
        .subscribe();
    }
  }

  public onPasswordChange() {
    if (this.password?.value && this.routeId) {
      this.userController
        .changePassword(this.routeId, this.password.value)
        .pipe(
          tap(() => {
            this.myFormDirective.resetForm();
            this.loadUserData();
          }),
        )
        .subscribe();
    }
  }
}
