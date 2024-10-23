import { Component, OnInit } from '@angular/core';
import { ChangeTypeEnum } from '../../../shared/enums/change-type.enum';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationController } from '../../controllers/location.controller';
import { ICreateLocationRequest } from '../../interfaces/create-location-request.interface';
import { tap } from 'rxjs';
import { UrlEnum } from '../../../shared/enums/url.enum';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss',
})
export class LocationCardComponent implements OnInit {
  public ChangeTypeEnum = ChangeTypeEnum;

  public changeType!: ChangeTypeEnum;

  public routeId = this.route.snapshot.paramMap.get('id');

  public title!: string;

  public createLocationForm = this.fb.group({
    shortName: ['', [Validators.required, Validators.minLength(3)]],
    longName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    address: this.fb.group({
      postCode: ['', [Validators.required, Validators.maxLength(4)]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private locationController: LocationController,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    if (!this.routeId || this.router.url.includes('new')) {
      this.changeType = ChangeTypeEnum.CREATE;
      this.title = 'Telephely létrehozása';
      return;
    } else {
      this.changeType = ChangeTypeEnum.EDIT;
      this.title = 'Telephely szerkesztése';
    }
    this.loadLocationData();
  }

  get shortName() {
    return this.createLocationForm.get('shortName');
  }

  get longName() {
    return this.createLocationForm.get('longName');
  }

  get phoneNumber() {
    return this.createLocationForm.get('phoneNumber');
  }

  get postCode() {
    return this.createLocationForm.get('address.postCode');
  }

  get city() {
    return this.createLocationForm.get('address.city');
  }

  get street() {
    return this.createLocationForm.get('address.street');
  }

  get houseNumber() {
    return this.createLocationForm.get('address.houseNumber');
  }

  public loadLocationData() {
    this.locationController
      .getLocation(this.routeId!)
      .pipe(tap((res) => this.createLocationForm.patchValue(res)))
      .subscribe();
  }

  public onCreateLocation() {
    this.locationController
      .createLocation(this.createLocationForm.value as ICreateLocationRequest)
      .pipe(
        tap(() => {
          this.router.navigate([UrlEnum.LOCATION]);
        }),
      )
      .subscribe();
  }

  public onSaveLocation() {
    this.locationController
      .editLocation(this.createLocationForm.value as ICreateLocationRequest, this.routeId!)
      .pipe(
        tap(() => {
          this.router.navigate([UrlEnum.LOCATION]);
        }),
      )
      .subscribe();
  }
}
