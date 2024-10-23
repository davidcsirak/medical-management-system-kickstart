import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocationGet } from '../interfaces/location-get.interface';
import { ICreateLocationRequest } from '../interfaces/create-location-request.interface';
import { CREATE_LOCATION_URL, LOCATION_URL } from '../utils/location-path';
import { ILocation } from '../interfaces/location.interface';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';
import { IAutocompletePageable } from '../../shared/interfaces/autocomplete-pageable.interface';
import { ILocationAutocompleteResult } from '../interfaces/location-autocomplete-result.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends ApiService {
  constructor(private http: HttpClient) {
    super(http);
  }

  createLocation(req: ICreateLocationRequest): Observable<ILocationGet> {
    return this.post(CREATE_LOCATION_URL, req);
  }

  editLocation(req: ICreateLocationRequest, id: string): Observable<ILocationGet> {
    return this.put(`${LOCATION_URL}/${id}`, req);
  }

  getLocation(id: string): Observable<ILocationGet> {
    return this.get(`${LOCATION_URL}/${id}`);
  }

  getLocations(page: number, size: number): Observable<IQueryResponse<ILocation>> {
    const queryParams = new HttpParams().set('page', page).set('size', size);
    return this.http.get<IQueryResponse<ILocation>>(LOCATION_URL, { params: queryParams });
  }

  getLocationAutocomplete(
    userId: string,
    shortName: string,
    pageable: IAutocompletePageable,
  ): Observable<IQueryResponse<ILocationAutocompleteResult>> {
    const queryParams = new HttpParams()
      .set('userId', userId)
      .set('shortName', shortName)
      .set('pageable.page', pageable.page)
      .set('pageable.size', pageable.size);

    return this.http.get<IQueryResponse<ILocationAutocompleteResult>>(`${LOCATION_URL}/search`, {
      params: queryParams,
    });
  }
}
