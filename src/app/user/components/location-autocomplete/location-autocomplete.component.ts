import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, Observable } from 'rxjs';
import { ILocationAutocompleteResult } from '../../../location/interfaces/location-autocomplete-result.interface';
import { LocationService } from '../../../location/services/location.service';
import { IAutocompletePageable } from '../../../shared/interfaces/autocomplete-pageable.interface';
import { IQueryResponse } from '../../../shared/interfaces/query-response.interface';

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrl: './location-autocomplete.component.scss',
})
export class LocationAutocompleteComponent implements OnInit {
  locationControl = new FormControl(); // Form control for the autocomplete input
  filteredLocations: ILocationAutocompleteResult[] = []; // Filtered locations for autocomplete

  @Output() locationSelected = new EventEmitter<ILocationAutocompleteResult>(); // Event to notify parent when a location is selected

  userId = '123'; // Example userId
  pageable: IAutocompletePageable = { page: 0, size: 10 };

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    // Listen to value changes in the autocomplete input and fetch data from the server
    this.locationControl.valueChanges
      .pipe(
        debounceTime(500), // Wait for user to stop typing
        switchMap((value) => this.fetchLocations(value)), // Fetch locations from the server
      )
      .subscribe((locations) => {
        this.filteredLocations = locations.content; // Set filtered locations
      });
  }

  // Fetch locations from the server based on user input
  fetchLocations(shortName: string): Observable<IQueryResponse<ILocationAutocompleteResult>> {
    return this.locationService.getLocationAutocomplete(this.userId, shortName, this.pageable);
  }

  // Handle location selection from autocomplete
  selectLocation(location: ILocationAutocompleteResult): void {
    this.locationSelected.emit(location); // Emit selected location to parent
    this.locationControl.setValue(''); // Clear input after selection
  }
}
