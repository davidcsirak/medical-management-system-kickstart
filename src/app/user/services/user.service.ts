import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { IUserGet } from '../interfaces/user-get.interface';
import { ICreateUserRequest } from '../interfaces/create-user-request.interface';
import { CREATE_USER_URL, USER_URL } from '../utils/user-path';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  constructor(private http: HttpClient) {
    super(http);
  }
  public createUser(req: ICreateUserRequest): Observable<IUserGet> {
    return this.post(CREATE_USER_URL, req);
  }

  public getUser(id: string): Observable<IUserGet> {
    return this.get(`${USER_URL}/${id}`);
  }

  public changePassword(userId: string, newPassword: string) {
    return this.patch(`${USER_URL}/${userId}/password-change`, { password: newPassword });
  }

  public deleteUser(id: string) {
    return this.delete(`${USER_URL}/${id}`);
  }

  public checkUsernameExits(username: string): Observable<{ usernameExists: boolean }> {
    return this.get(`${USER_URL}/exists?username=${username}`);
  }

  public getUsers(page: number, size: number): Observable<IQueryResponse<IUserGet>> {
    const queryParams = new HttpParams().set('page', page).set('size', size);
    return this.http.get<IQueryResponse<IUserGet>>(USER_URL, { params: queryParams });
  }

  public assignUserToLocation(userId: string, locationId: string) {
    return this.post(`${USER_URL}/${userId}/service-provider/${locationId}`);
  }

  public unassignUserFromLocation(userId: string, locationId: string) {
    return this.delete(`${USER_URL}/${userId}/service-provider/${locationId}`);
  }
}
