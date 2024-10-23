import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationListComponent } from './components/location-list/location-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '../shared/components/card/card.component';

@NgModule({
  declarations: [LocationCardComponent, LocationListComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CardComponent,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class LocationModule {}
