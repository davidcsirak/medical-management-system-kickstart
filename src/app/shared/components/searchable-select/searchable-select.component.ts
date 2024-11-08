import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReplaySubject, take, tap } from 'rxjs';
import { AuthenticationController } from '../../../authentication/controllers/authentication.controller';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
export class SearchableSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() multiple = false;

  protected values: any[] = [];

  public selectControl = new FormControl('');
  public searchControl = new FormControl('');

  public filteredValues = new ReplaySubject<any[]>(1);

  public isRequired = false;
  public isDisabled = false;

  private destroyRef = inject(DestroyRef);

  protected onChange!: (value: unknown) => void;
  protected onTouched!: () => void;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private authController: AuthenticationController,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.isRequired = this.ngControl.control?.hasValidator(Validators.required) ?? false;
    this.authController
      .getCurrentUser()
      .pipe(
        tap((res) => {
          this.values = res.serviceProviders;
          this.filteredValues.next(res.serviceProviders);
        }),
      )
      .subscribe();

    // call this.onChange to notify the parent component that the value has changed
    this.selectControl.valueChanges
      .pipe(
        tap((value) => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        tap(() => this.filterValues()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.initValues();
  }

  private filterValues() {
    if (!this.values) {
      return;
    }
    let search = this.searchControl.value;
    if (!search) {
      this.filteredValues.next(this.values.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredValues.next(
      this.values.filter((value) => value.shortName.toLowerCase().indexOf(search) > -1),
    );
  }

  private initValues() {
    this.filteredValues.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  // Called when value is set from outside the component
  writeValue(value: string): void {
    this.selectControl.setValue(value);
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectControl.disable();
    }
  }
}
