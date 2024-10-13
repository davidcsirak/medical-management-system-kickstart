import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AUTHENTICATE_URL } from '../utils/authentication.path';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  public login(username: string, password: string): Observable<ILoginResponse> {
    return this.post(AUTHENTICATE_URL, { username, password });
  }
}
