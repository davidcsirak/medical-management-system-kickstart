import { Injectable } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ILocationGet } from '../interfaces/location-get.interface';
import { Observable } from 'rxjs';
import { ICreateLocationRequest } from '../interfaces/create-location-request.interface';
import { ILocation } from '../interfaces/location.interface';
import { IPaginatorData } from '../../shared/interfaces/paginator-data.interface';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';
import { IAutocompletePageable } from '../../shared/interfaces/autocomplete-pageable.interface';
import { ILocationAutocompleteResult } from '../interfaces/location-autocomplete-result.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationController {
  constructor(private locationService: LocationService) {}

  public createLocation(req: ICreateLocationRequest): Observable<ILocationGet> {
    return this.locationService.createLocation(req);
  }

  public editLocation(req: ICreateLocationRequest, id: string): Observable<ILocationGet> {
    return this.locationService.editLocation(req, id);
  }

  public getLocation(id: string): Observable<ILocationGet> {
    return this.locationService.getLocation(id);
  }

  public getLocations(paginatorData: IPaginatorData): Observable<IQueryResponse<ILocation>> {
    return this.locationService.getLocations(paginatorData.pageIndex, paginatorData.pageSize);
  }

  public getLocationAutocomplete(
    userId: string,
    shortName: string,
    pageable: IAutocompletePageable,
  ): Observable<IQueryResponse<ILocationAutocompleteResult>> {
    return this.locationService.getLocationAutocomplete(userId, shortName, pageable);
  }
}
