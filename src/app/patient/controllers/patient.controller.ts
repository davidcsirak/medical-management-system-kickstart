import { Injectable } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Observable } from 'rxjs';
import { ICreatePatientRequest } from '../interfaces/create-patient-request.interface';
import { IPatientGet } from '../interfaces/patient-get.interface';
import { IQueryResponse } from '../../shared/interfaces/query-response.interface';
import { IPatientFilterValues } from '../interfaces/patient-filter.interface';
import { IPatient } from '../interfaces/patient.interface';
import { IPaginatorData } from '../../shared/interfaces/paginator-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientController {
  constructor(private patientService: PatientService) {}

  public createPatient(req: ICreatePatientRequest): Observable<IPatientGet> {
    return this.patientService.createPatient(req);
  }

  public getPatient(id: string): Observable<IPatientGet> {
    return this.patientService.getPatient(id);
  }

  public editPatient(req: ICreatePatientRequest, id: string): Observable<IPatientGet> {
    return this.patientService.editPatient(req, id);
  }

  public getPatients(
    paginatorData: IPaginatorData,
    patientFilter: IPatientFilterValues,
  ): Observable<IQueryResponse<IPatient>> {
    return this.patientService.getPatients(
      paginatorData.pageIndex,
      paginatorData.pageSize,
      patientFilter,
    );
  }
}
