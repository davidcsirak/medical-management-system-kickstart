import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthenticationController } from './authentication/controllers/authentication.controller';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MMS-Kickstart';
  public currentUser$ = this.authController.getUserAsObservable();

  constructor(private authController: AuthenticationController) {}
}
