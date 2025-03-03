import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { SexEnum } from '../../enums/sex.enum';
import { tap } from 'rxjs';
import { IPatient } from '../../interfaces/patient.interface';
import { PatientController } from '../../controllers/patient.controller';
import { IPaginatorData } from '../../../shared/interfaces/paginator-data.interface';
import { DEFAULT_CARD_PAGINATION_CONFIG } from '../../../user/utils/default-pagination.util';
import { IPatientFilterValues } from '../../interfaces/patient-filter.interface';
import { PageEvent } from '@angular/material/paginator';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    return `${date.getFullYear()}`;
  }
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class PatientListComponent implements OnInit {
  public patients!: IPatient[];

  public SexEnum = SexEnum;

  public paginationConfig: IPaginatorData = DEFAULT_CARD_PAGINATION_CONFIG;

  public patientFilterForm = this.fb.group({
    name: [''],
    year: [''],
    sex: [''],
    socialSecurityNumber: [''],
    serviceProviderId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private patientController: PatientController,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients() {
    this.patientController
      .getPatients(this.paginationConfig, this.patientFilterForm.value as IPatientFilterValues)
      .pipe(
        tap((res) => {
          this.patients = res.content;
          this.paginationConfig.totalElements = res.page.totalElements;
          this.paginationConfig.pageSize = res.page.size;
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

  chosenYearHandler(date: Date, picker: MatDatepicker<Date>) {
    this.year?.setValue(new Date(date.getFullYear(), 12, 0) as unknown as string);
    picker.close();
  }

  get year() {
    return this.patientFilterForm.get('year');
  }
}
