import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocationAutocompleteResult } from '../../../location/interfaces/location-autocomplete-result.interface';

@Component({
  selector: 'app-location-chip-list',
  templateUrl: './location-chip-list.component.html',
  styleUrl: './location-chip-list.component.scss',
})
export class LocationChipListComponent {
  @Input() selectedLocations: ILocationAutocompleteResult[] = []; // Input from parent
  @Output() removeLocationEvent = new EventEmitter<ILocationAutocompleteResult>(); // Event to notify parent on chip removal

  // Emit the location to remove when a chip is removed
  removeLocation(location: ILocationAutocompleteResult): void {
    this.removeLocationEvent.emit(location);
  }
}
