import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationController } from '../../../authentication/controllers/authentication.controller';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleEnum } from '../../enums/role.enum';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public RoleEnum = RoleEnum;
  public currentUser$ = this.authController.getUserAsObservable();

  constructor(private authController: AuthenticationController) {}

  onLogout() {
    this.authController.logout().subscribe();
  }
}
