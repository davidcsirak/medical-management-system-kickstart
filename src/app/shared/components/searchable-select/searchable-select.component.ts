import { Component, DestroyRef, inject, Input, OnInit, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  ReplaySubject,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LocationController } from '../../../location/controllers/location.controller';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [
    CommonModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.scss',
})
export class SearchableSelectComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) userId!: string;

  public selectControl: FormControl = new FormControl('');
  public searchControl: FormControl = new FormControl('');
  public searching = false;
  public isRequired = false;
  public filteredValues: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public comparator = (o1: any, o2: any) =>
    o1 && o2 && o1.id === o2.id && o1.shortName === o2.shortName;

  private destroyRef = inject(DestroyRef);
  protected onChange!: (value: unknown) => void;

  protected onTouched!: () => void;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private locationController: LocationController,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    this.isRequired = this.ngControl.control?.hasValidator(Validators.required) ?? false;

    // call this.onChange to notify the parent component that the value has changed
    this.selectControl.valueChanges
      .pipe(
        tap((value) => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        tap(() => (this.searching = true)),
        debounceTime(500),
        switchMap((search) => {
          return this.locationController.getLocationAutocomplete(this.userId, search, {
            page: 0,
            size: 20,
          });
        }),
        tap((res) => {
          this.searching = false;
          const filteredValues = res.content;
          this.filteredValues.next(filteredValues);
          if (filteredValues.length === 1) {
            this.selectControl.setValue(filteredValues[0].id);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.searching = false;
          this.filteredValues.next([]);
          return throwError(() => err);
        }),
      )
      .subscribe();
  }

  // Called when value is set from outside the component
  writeValue(value: any): void {
    this.filteredValues.next([value]);
    this.selectControl.setValue(value.id);
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
