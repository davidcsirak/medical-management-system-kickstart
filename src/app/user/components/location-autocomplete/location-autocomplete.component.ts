import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, Observable, tap } from 'rxjs';
import { ILocationAutocompleteResult } from '../../../location/interfaces/location-autocomplete-result.interface';
import { IAutocompletePageable } from '../../../shared/interfaces/autocomplete-pageable.interface';
import { IQueryResponse } from '../../../shared/interfaces/query-response.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationController } from '../../../location/controllers/location.controller';

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrl: './location-autocomplete.component.scss',
})
export class LocationAutocompleteComponent {
  locationControl = new FormControl();
  filteredLocations: ILocationAutocompleteResult[] = [];

  @Input({ required: true }) userId!: string;
  @Output() locationSelected = new EventEmitter<ILocationAutocompleteResult>();

  pageable: IAutocompletePageable = { page: 0, size: 10 };

  constructor(private locationController: LocationController) {
    this.locationControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.fetchLocations(value || '')),
        tap((res) => {
          this.filteredLocations = res.content;
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  fetchLocations(shortName: string): Observable<IQueryResponse<ILocationAutocompleteResult>> {
    return this.locationController.getLocationAutocomplete(this.userId, shortName, this.pageable);
  }

  selectLocation(location: ILocationAutocompleteResult): void {
    this.locationSelected.emit(location);
    this.locationControl.setValue('');
  }

  onInputFocus(): void {
    if (!this.locationControl.value) {
      this.fetchLocations('').subscribe((res) => {
        this.filteredLocations = res.content;
      });
    }
  }
}
