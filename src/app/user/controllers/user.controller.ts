import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserController {
  constructor(private userService: UserService) {}

  public createUser(username: string, password: string, role: RoleEnum): Observable<IUser> {
    return this.userService.createUser({ username, password, role });
  }
}
