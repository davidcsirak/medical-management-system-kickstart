import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocationAutocompleteResult } from '../../../location/interfaces/location-autocomplete-result.interface';

@Component({
  selector: 'app-location-chip-list',
  templateUrl: './location-chip-list.component.html',
  styleUrl: './location-chip-list.component.scss',
})
export class LocationChipListComponent {
  @Input() selectedLocations: ILocationAutocompleteResult[] = [];
  @Output() removeLocationEvent = new EventEmitter<ILocationAutocompleteResult>();

  removeLocation(location: ILocationAutocompleteResult): void {
    this.removeLocationEvent.emit(location);
  }
}
