import { Component, OnInit, ViewChild } from '@angular/core';
import { UserController } from '../../controllers/user.controller';
import { IUserGet } from '../../interfaces/user-get.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';
import { Router } from '@angular/router';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { tap } from 'rxjs';
import { DEFAULT_PAGINATION_CONFIG } from '../../utils/default-pagination.util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'role', 'serviceProviders', 'actions'];

  dataSource: IUserGet[] = [];

  paginationConfig: IPaginatorData = DEFAULT_PAGINATION_CONFIG;

  readonly RoleEnum = RoleEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userController: UserController,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  onPageChange($event: PageEvent) {
    this.paginationConfig.pageIndex = $event.pageIndex;
    this.paginationConfig.pageSize = $event.pageSize;
    this.loadUsers();
  }

  private loadUsers() {
    this.userController.getUsers(this.paginationConfig).subscribe((res) => {
      this.dataSource = res.content;
      this.paginationConfig.totalElements = res.page.totalElements;
      this.paginationConfig.pageSize = res.page.size;
    });
  }

  onEditUser(user: IUserGet) {
    this.router.navigate([UrlEnum.USER, user.id, UrlEnum.EDIT]);
  }

  onDeleteUser(user: IUserGet) {
    this.userController
      .deleteUser(user.id)
      .pipe(tap(() => this.loadUsers()))
      .subscribe();
  }
}
