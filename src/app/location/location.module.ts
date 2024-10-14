import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [LocationCardComponent],
  imports: [CommonModule, LocationRoutingModule],
})
export class LocationModule {}
