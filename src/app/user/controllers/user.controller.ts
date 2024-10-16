import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';
import { IPaginatorData } from '../../shared/interfaces/paginator-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserController {
  constructor(private userService: UserService) {}

  public createUser(username: string, password: string, role: RoleEnum): Observable<IUser> {
    return this.userService.createUser({ username, password, role });
  }

  public getUser(id: string): Observable<IUser> {
    return this.userService.getUser(id);
  }

  public changePassword(userId: string, newPassword: string) {
    return this.userService.changePassword(userId, newPassword);
  }

  public deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }

  public checkUsernameExits(username: string): Observable<{ usernameExists: boolean }> {
    return this.userService.checkUsernameExits(username);
  }

  public getUsers(paginatorData: IPaginatorData): Observable<IQueryResponse<IUser>> {
    return this.userService.getUsers(paginatorData.pageIndex, paginatorData.pageSize);
  }
}
