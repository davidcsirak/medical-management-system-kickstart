import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocationSearchResult } from '../../../location/interfaces/location-autocomplete-result.interface';

@Component({
  selector: 'app-location-chip-list',
  templateUrl: './location-chip-list.component.html',
  styleUrl: './location-chip-list.component.scss',
})
export class LocationChipListComponent {
  @Input() selectedLocations: ILocationSearchResult[] = [];
  @Output() removeLocationEvent = new EventEmitter<ILocationSearchResult>();

  removeLocation(location: ILocationSearchResult): void {
    this.removeLocationEvent.emit(location);
  }
}
