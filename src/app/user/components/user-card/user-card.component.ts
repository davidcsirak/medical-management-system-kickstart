import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { UserController } from '../../controllers/user.controller';
import { UrlEnum } from '../../../shared/enums/url.enum';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { ChangeTypeEnum } from '../../../shared/enums/change-type.enum';
import { checkUsername } from '../../../shared/utils/async-validators';
import { LocationController } from '../../../location/controllers/location.controller';
import { ILocationAutocompleteResult } from '../../../location/interfaces/location-autocomplete-result.interface';
import { IAutocompletePageable } from '../../../shared/interfaces/autocomplete-pageable.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IQueryResponse } from '../../../shared/interfaces/query-response.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {
  @ViewChild('myForm') myFormDirective!: FormGroupDirective;

  public RoleEnum = RoleEnum;

  public ChangeTypeEnum = ChangeTypeEnum;

  public changeType!: ChangeTypeEnum;

  public routeId = this.route.snapshot.paramMap.get('id');

  public title!: string;

  locationControl = new FormControl(); // Form control for the autocomplete input
  selectedLocations: ILocationAutocompleteResult[] = []; // Array to store selected locations
  filteredLocations: ILocationAutocompleteResult[] = []; // Filtered locations for autocomplete
  userId = this.route.snapshot.paramMap.get('id') ?? ''; // Example userId
  pageable: IAutocompletePageable = {
    page: 0,
    size: 10,
  };
  private destroyRef = inject(DestroyRef);

  public createUserForm = this.fb.group({
    username: ['', [Validators.required], [checkUsername()]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userController: UserController,
    private locationController: LocationController,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    if (!this.routeId || this.router.url.includes('new')) {
      this.changeType = ChangeTypeEnum.CREATE;
      this.title = 'Felhasználó létrehozása';
      // this.locationController.getLocationAutocomplete('1', 'cs', { page: 0, size: 10 }).subscribe();
      return;
    } else {
      this.changeType = ChangeTypeEnum.EDIT;
      this.createUserForm.controls.username.disable();
      this.createUserForm.controls.role.disable();
      this.title = 'Felhasználó szerkesztése';
      this.loadUserData();
      this.locationControl.valueChanges
        .pipe(
          debounceTime(300), // Wait for user to stop typing
          switchMap((value) => this.fetchLocations(value)), // Fetch locations from the server
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((locations) => {
          this.filteredLocations = locations.content; // Set filtered locations
        });
    }
  }

  // Fetch locations from the server based on user input
  fetchLocations(shortName: string): Observable<IQueryResponse<ILocationAutocompleteResult>> {
    return this.locationController.getLocationAutocomplete(this.userId, shortName, this.pageable);
  }

  // Handle location selection from autocomplete
  selectLocation(location: ILocationAutocompleteResult): void {
    if (!this.selectedLocations.some((l) => l.id === location.id)) {
      this.selectedLocations.push(location); // Add selected location to chips
      this.assignLocationToUser(location.id); // Call backend API to assign location to user
    }
    this.locationControl.setValue(''); // Clear input after selection
  }

  assignLocationToUser(locationId: string): void {
    this.userController.assignUserToLocation(this.userId, locationId).subscribe();
  }

  // Remove location from the selected list
  removeLocation(location: ILocationAutocompleteResult): void {
    const index = this.selectedLocations.indexOf(location);
    if (index >= 0) {
      this.selectedLocations.splice(index, 1);
      this.userController.unassignUserFromLocation(this.userId, location.id).subscribe();
    }
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get role() {
    return this.createUserForm.get('role');
  }

  private loadUserData() {
    this.userController
      .getUser(this.routeId!)
      .pipe(
        tap((res) => {
          this.createUserForm.patchValue(res);
          this.selectedLocations = res.serviceProviders;
        }),
      )
      .subscribe();
  }

  public onCreateUser() {
    if (this.username?.value && this.password?.value && this.role?.value) {
      this.userController
        .createUser(this.username.value, this.password.value, this.role.value as RoleEnum)
        .pipe(tap((res) => this.router.navigate([UrlEnum.USER, res.id, UrlEnum.EDIT])))
        .subscribe();
    }
  }

  public onDeleteUser() {
    if (this.routeId) {
      this.userController
        .deleteUser(this.routeId)
        .pipe(tap(() => this.router.navigate([UrlEnum.USER])))
        .subscribe();
    }
  }

  public onPasswordChange() {
    if (this.password?.value && this.routeId) {
      this.userController
        .changePassword(this.routeId, this.password.value)
        .pipe(
          tap(() => {
            this.myFormDirective.resetForm();
            this.loadUserData();
          }),
        )
        .subscribe();
    }
  }
}
