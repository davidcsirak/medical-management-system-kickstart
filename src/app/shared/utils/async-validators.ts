import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { inject } from '@angular/core';
import { UserController } from '../../user/controllers/user.controller';
import { Observable, of, map, catchError, delay, switchMap } from 'rxjs';
export function checkUsername(): AsyncValidatorFn {
  const userController = inject(UserController);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      delay(500),
      switchMap((username) =>
        userController.checkUsernameExits(username).pipe(
          map((response) => {
            return response.usernameExists ? { usernameExists: true } : null;
          }),
          catchError(() => of(null)),
        ),
      ),
    );
  };
}
