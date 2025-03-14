import { Component, OnInit } from '@angular/core';
import { PatientController } from '../../controllers/patient.controller';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeTypeEnum } from '../../../shared/enums/change-type.enum';
import { SexEnum } from '../../enums/sex.enum';
import { tap } from 'rxjs';
import { ICreatePatientRequest } from '../../interfaces/create-patient-request.interface';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { AuthenticationController } from '../../../authentication/controllers/authentication.controller';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent implements OnInit {
  public ChangeTypeEnum = ChangeTypeEnum;

  public SexEnum = SexEnum;

  public changeType!: ChangeTypeEnum;

  public routeId = this.route.snapshot.paramMap.get('id');

  public title!: string;

  public createPatientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    socialSecurityNumber: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
    ],
    sex: ['', [Validators.required]],
    placeOfBirth: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    birthName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    motherBirthName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    serviceProviderId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientController: PatientController,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authController: AuthenticationController,
  ) {}

  ngOnInit(): void {
    if (!this.routeId || this.router.url.includes('new')) {
      this.changeType = ChangeTypeEnum.CREATE;
      this.title = 'Páciens létrehozása';
      const currentUser = this.authController.getCurrentUserValue();
      if (currentUser && currentUser.serviceProviders.length === 1) {
        this.createPatientForm.controls.serviceProviderId.setValue(
          currentUser.serviceProviders[0].id,
        );
      }
      return;
    } else if (this.router.url.includes('edit')) {
      this.changeType = ChangeTypeEnum.EDIT;
      this.title = 'Páciens szerkesztése';
    } else {
      this.changeType = ChangeTypeEnum.VIEW;
      this.title = 'Páciens megtekintése';
      this.createPatientForm.disable();
    }
    this.loadPatientData();
  }

  loadPatientData(): void {
    this.patientController
      .getPatient(this.routeId!)
      .pipe(
        tap((res) => {
          this.createPatientForm.patchValue(res);
          this.createPatientForm.controls.serviceProviderId.setValue(res.serviceProvider.id);
        }),
      )
      .subscribe();
  }

  onCreatePatient(): void {
    this.patientController
      .createPatient(this.createPatientForm.value as ICreatePatientRequest)
      .pipe(tap((res) => this.router.navigate([UrlEnum.PATIENT, res.id, UrlEnum.EDIT])))
      .subscribe();
  }

  onSavePatient(): void {
    this.patientController
      .editPatient(this.createPatientForm.value as ICreatePatientRequest, this.routeId!)
      .pipe(tap(() => this.router.navigate([UrlEnum.PATIENT, this.routeId, UrlEnum.VIEW])))
      .subscribe();
  }

  onEditPatient() {
    this.router.navigate([UrlEnum.PATIENT, this.routeId, UrlEnum.EDIT]);
  }

  onDateChange($event: MatDatepickerInputEvent<string, Date>) {
    this.dateOfBirth?.setValue(this.datePipe.transform($event.value, 'yyyy-MM-dd'), {
      emitEvent: false,
    });
  }

  get name() {
    return this.createPatientForm.get('name');
  }

  get socialSecurityNumber() {
    return this.createPatientForm.get('socialSecurityNumber');
  }

  get sex() {
    return this.createPatientForm.get('sex');
  }

  get placeOfBirth() {
    return this.createPatientForm.get('placeOfBirth');
  }

  get dateOfBirth() {
    return this.createPatientForm.get('dateOfBirth');
  }

  get birthName() {
    return this.createPatientForm.get('birthName');
  }

  get motherBirthName() {
    return this.createPatientForm.get('motherBirthName');
  }

  get serviceProviderId() {
    return this.createPatientForm.get('serviceProviderId');
  }
}
