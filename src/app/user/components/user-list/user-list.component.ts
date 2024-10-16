import { Component, OnInit, ViewChild } from '@angular/core';
import { UserController } from '../../controllers/user.controller';
import { IUser } from '../../interfaces/user.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'role', 'serviceProviders'];

  dataSource: IUser[] = [];

  paginationConfig: IPaginatorData = {
    pageIndex: 0,
    pageSize: 5,
    totalElements: 0,
  };

  readonly RoleEnum = RoleEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userController: UserController) {}

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
      this.paginationConfig.totalElements = res.totalElements;
      this.paginationConfig.pageSize = res.pageable.pageSize;
    });
  }
}
