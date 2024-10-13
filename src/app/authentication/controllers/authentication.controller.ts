import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  public login(username: string, password: string) {
    return this.authService.login(username, password);
  }
}
