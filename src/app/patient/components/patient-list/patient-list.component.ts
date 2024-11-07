import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { SexEnum } from '../../enums/sex.enum';
import { tap } from 'rxjs';
import { IPatient } from '../../interfaces/patient.interface';
import { PatientController } from '../../controllers/patient.controller';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';
import { DEFAULT_CARD_PAGINATION_CONFIG } from '../../../user/utils/default-pagination.util';
import { IPatientFilterValues } from '../../interfaces/patient-filter.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent implements OnInit {
  public patients!: IPatient[];

  public SexEnum = SexEnum;

  public paginationConfig: IPaginatorData = DEFAULT_CARD_PAGINATION_CONFIG;

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
    private patientController: PatientController,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients() {
    console.log(this.patientFilterForm.value);

    this.patientController
      .getPatients(this.paginationConfig, this.patientFilterForm.value as IPatientFilterValues)
      .pipe(
        tap((res) => {
          this.patients = res.content;
          this.paginationConfig.totalElements = res.totalElements;
          this.paginationConfig.pageSize = res.pageable.pageSize;
        }),
      )
      .subscribe();
  }

  onFilter() {
    this.loadPatients();
  }

  onClearFilters() {
    this.patientFilterForm.reset();
    this.loadPatients();
  }

  onPageChange($event: PageEvent) {
    this.paginationConfig.pageIndex = $event.pageIndex;
    this.paginationConfig.pageSize = $event.pageSize;
    this.loadPatients();
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
