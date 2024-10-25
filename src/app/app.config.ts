import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { AuthenticationController } from './authentication/controllers/authentication.controller';
import { AppInit } from './shared/utils/provider-factory';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    DatePipe,
    importProvidersFrom(MatNativeDateModule),
    {
      provide: APP_INITIALIZER,
      useFactory: AppInit,
      multi: true,
      deps: [AuthenticationController],
    },
  ],
};
