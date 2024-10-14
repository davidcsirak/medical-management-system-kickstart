import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IUser } from '../../user/interfaces/user.interface';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { Router } from '@angular/router';
import { UrlEnum } from '../../shared/enums/url.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationController {
  private _currentUser$ = new BehaviorSubject<IUser | null>(null);

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  public login(username: string, password: string) {
    return this.authService.login(username, password).pipe(
      tap((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      }),
      switchMap(() => this.getCurrentUser()),
      tap((res) => this.setUser(res)),
    );
  }

  public refresh(): Observable<ILoginResponse> {
    return this.authService.refresh();
  }

  public logout() {
    return this.authService.logout().pipe(
      tap(() => {
        this.clearUser();
        this.router.navigate([UrlEnum.AUTHENTICATION]);
      }),
    );
  }

  public setUser(user: IUser) {
    this._currentUser$.next(user);
  }

  public saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  public getCurrentUser(): Observable<IUser> {
    return this.authService.getCurrentUser();
  }

  public clearUser() {
    localStorage.clear();
    this._currentUser$.next(null);
  }

  public getSessionToken() {
    return localStorage.getItem('accessToken') ?? '';
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken') ?? '';
  }

  public getUserAsObservable(): Observable<IUser | null> {
    return this._currentUser$.asObservable();
  }

  public restoreSession() {
    return this.getCurrentUser().pipe(
      tap((user) => this.setUser(user)),
      catchError(() => {
        this.clearUser();
        return of(null);
      }),
    );
  }
}
