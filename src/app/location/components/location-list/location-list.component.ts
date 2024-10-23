import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';
import { DEFAULT_PAGINATION_CONFIG } from '../../../user/utils/default-pagination.util';
import { ILocation } from '../../interfaces/location.interface';
import { LocationController } from '../../controllers/location.controller';
import { Router } from '@angular/router';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { IUserGet } from '../../../user/interfaces/user-get.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent implements OnInit {
  displayedColumns: string[] = ['longName', 'shortName', 'actions'];

  dataSource: ILocation[] = [];

  paginationConfig: IPaginatorData = DEFAULT_PAGINATION_CONFIG;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private locationController: LocationController,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  onPageChange($event: PageEvent) {
    this.paginationConfig.pageIndex = $event.pageIndex;
    this.paginationConfig.pageSize = $event.pageSize;
    this.loadLocations();
  }

  private loadLocations() {
    this.locationController.getLocations(this.paginationConfig).subscribe((res) => {
      this.dataSource = res.content;
      this.paginationConfig.totalElements = res.totalElements;
      this.paginationConfig.pageSize = res.pageable.pageSize;
    });
  }

  onEditLocation(user: IUserGet) {
    this.router.navigate([UrlEnum.LOCATION, user.id, UrlEnum.EDIT]);
  }
}
