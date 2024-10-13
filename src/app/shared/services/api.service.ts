import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestOptions } from '../interfaces/request-options.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  constructor(private httpClient: HttpClient) {}

  /** GET kérés küldése a _serviceUrl + endPoint_ végpontra. */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.httpClient.get<T>(endPoint, options);
  }

  /** GET kérés küldése a _serviceUrl + endPoint_ végpontra. */
  public getBlob<ArrayBuffer>(
    endPoint: string,
    options?: IRequestOptions,
  ): Observable<ArrayBuffer> {
    return this.httpClient.get<ArrayBuffer>(endPoint, options);
  }

  /** POST kérés küldése a _serviceUrl + endPoint_ végpontra. */
  public post<T>(endPoint: string, body?: unknown, options?: IRequestOptions): Observable<T> {
    return this.httpClient.post<T>(endPoint, body, options);
  }

  /** PUT kérés küldése a _serviceUrl + endPoint_ végpontra. */
  public put<T>(endPoint: string, body?: unknown, options?: IRequestOptions): Observable<T> {
    return this.httpClient.put<T>(endPoint, body, options);
  }

  /** DELETE kérés küldése a _serviceUrl + endPoint_ végpontra. */
  public delete<T>(endPoint: string, body?: unknown, options?: IRequestOptions): Observable<T> {
    return this.httpClient.delete<T>(endPoint, options);
  }
}
