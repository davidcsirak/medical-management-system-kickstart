import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import {
  AUTHENTICATE_URL,
  CURRENT_USER_URL,
  LOGOUT_URL,
  REFRESH_URL,
} from '../utils/authentication.path';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { IUserGet } from '../../user/interfaces/user-get.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  public login(username: string, password: string): Observable<ILoginResponse> {
    return this.post(AUTHENTICATE_URL, { username, password });
  }

  public getCurrentUser(): Observable<IUserGet> {
    return this.get(CURRENT_USER_URL);
  }

  public refresh(): Observable<ILoginResponse> {
    return this.post(REFRESH_URL);
  }

  public logout() {
    return this.post(LOGOUT_URL);
  }
}
