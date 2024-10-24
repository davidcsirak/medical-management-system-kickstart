import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { ICreatePatientRequest } from '../interfaces/create-patient-request.interface';
import { IPatientGet } from '../interfaces/patient-get.interface';
import { Observable } from 'rxjs';
import { PATIENT_URL } from '../utils/patient-path';

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
}
