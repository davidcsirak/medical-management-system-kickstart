import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreatePatientRequest } from '../interfaces/create-patient-request.interface';
import { IPatientGet } from '../interfaces/patient-get.interface';
import { Observable } from 'rxjs';
import { PATIENT_URL } from '../utils/patient-path';
import { IPatient } from '../interfaces/patient.interface';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';
import { IPatientFilterValues } from '../interfaces/patient-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends ApiService {
  constructor(private http: HttpClient) {
    super(http);
  }

  createPatient(req: ICreatePatientRequest): Observable<IPatientGet> {
    return this.post(PATIENT_URL, req);
  }

  getPatient(id: string): Observable<IPatientGet> {
    return this.get(`${PATIENT_URL}/${id}`);
  }

  editPatient(req: ICreatePatientRequest, id: string): Observable<IPatientGet> {
    return this.put(`${PATIENT_URL}/${id}`, req);
  }

  getPatients(
    page: number,
    size: number,
    patientFilter: IPatientFilterValues,
  ): Observable<IQueryResponse<IPatient>> {
    let queryParams = new HttpParams().set('page', page).set('size', size);

    if (patientFilter.name) {
      queryParams = queryParams.set('name', patientFilter.name);
    }
    if (patientFilter.socialSecurityNumber) {
      queryParams = queryParams.set('socialSecurityNumber', patientFilter.socialSecurityNumber);
    }
    if (patientFilter.serviceProviderId) {
      queryParams = queryParams.set('serviceProviderId', patientFilter.serviceProviderId);
    }
    if (patientFilter.dateOfBirth) {
      queryParams = queryParams.set('dateOfBirth', patientFilter.dateOfBirth);
    }
    if (patientFilter.sex) {
      queryParams = queryParams.set('sex', patientFilter.sex);
    }

    return this.http.get<IQueryResponse<IPatient>>(`${PATIENT_URL}`, {
      params: queryParams,
    });
  }
}
