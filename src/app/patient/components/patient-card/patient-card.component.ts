import { Component, OnInit } from '@angular/core';
import { PatientController } from '../../controllers/patient.controller';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeTypeEnum } from '../../../shared/enums/change-type.enum';
import { SexEnum } from '../../enums/sex.enum';
import { tap } from 'rxjs';
import { ICreatePatientRequest } from '../../interfaces/create-patient-request.interface';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { ILocationSearchResult } from '../../../location/interfaces/location-autocomplete-result.interface';
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

  public currentUser = this.authController.getCurrentUserValue();

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
    private authController: AuthenticationController,
  ) {}

  ngOnInit(): void {
    if (!this.routeId || this.router.url.includes('new')) {
      this.changeType = ChangeTypeEnum.CREATE;
      this.title = 'Ellátott létrehozása';
      return;
    } else {
      this.changeType = ChangeTypeEnum.EDIT;
      this.title = 'Ellátott szerkesztése';
    }
    this.loadPatientData();
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

  onLocationSelected(location: ILocationSearchResult): void {
    this.serviceProviderId?.setValue(location.id);
  }

  loadPatientData(): void {
    this.patientController
      .getPatient(this.routeId!)
      .pipe(tap((res) => this.createPatientForm.patchValue(res)))
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
      .pipe(tap(() => this.router.navigate([UrlEnum.PATIENT])))
      .subscribe();
  }
}
