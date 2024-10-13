import { Routes } from '@angular/router';
import { UrlEnum } from './shared/enums/url.enum';

const lazyImports = {
  Authentication: () =>
    import('./authentication/authentication.module').then((module) => module.AuthenticationModule),
  User: () => import('./user/user.module').then((module) => module.UserModule),
  Location: () => import('./location/location.module').then((module) => module.LocationModule),
  Patient: () => import('./patient/patient.module').then((module) => module.PatientModule),
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: UrlEnum.AUTHENTICATION,
  },
  {
    path: UrlEnum.AUTHENTICATION,
    loadChildren: () => lazyImports.Authentication(),
  },
  {
    path: UrlEnum.USER,
    loadChildren: () => lazyImports.User(),
  },
  {
    path: UrlEnum.LOCATION,
    loadChildren: () => lazyImports.Location(),
  },
  {
    path: UrlEnum.PATIENT,
    loadChildren: () => lazyImports.Patient(),
  },
];
