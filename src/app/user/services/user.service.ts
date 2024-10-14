import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ICreateUserRequest } from '../interfaces/create-user-request.interface';
import { CREATE_USER_URL } from '../utils/user-path';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  public createUser(req: ICreateUserRequest): Observable<IUser> {
    return this.post(CREATE_USER_URL, req);
  }
}
