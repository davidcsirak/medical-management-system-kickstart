import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { SexEnum } from '../../enums/sex.enum';
import { AuthenticationController } from '../../../authentication/controllers/authentication.controller';
import { tap } from 'rxjs';
import { IPatient } from '../../interfaces/patient.interface';
import { PatientController } from '../../controllers/patient.controller';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';
import { DEFAULT_PAGINATION_CONFIG } from '../../../user/utils/default-pagination.util';
import { IPatientFilterValues } from '../../interfaces/patient-filter.interface';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent implements OnInit {
  public patients!: IPatient[];

  public SexEnum = SexEnum;

  public currentUser = this.authController.getCurrentUserValue();

  public paginationConfig: IPaginatorData = DEFAULT_PAGINATION_CONFIG;

  public patientFilterForm = this.fb.group({
    name: [''],
    dateOfBirth: [''],
    sex: [''],
    socialSecurityNumber: [''],
    serviceProviderId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private authController: AuthenticationController,
    private patientController: PatientController,
  ) {}

  ngOnInit(): void {
    console.log(this.patientFilterForm.value);
    this.getPatients();
  }

  private getPatients() {
    this.patientController
      .getPatients(this.paginationConfig, this.patientFilterForm.value as IPatientFilterValues)
      .pipe(
        tap((res) => {
          this.patients = res.content;
          this.paginationConfig.totalElements = res.totalElements;
        }),
      )
      .subscribe();
  }

  onDateChange($event: MatDatepickerInputEvent<string, Date>) {
    this.dateOfBirth?.setValue(this.datePipe.transform($event.value, 'yyyy-MM-dd'), {
      emitEvent: false,
    });
  }

  get dateOfBirth() {
    return this.patientFilterForm.get('dateOfBirth');
  }
}
