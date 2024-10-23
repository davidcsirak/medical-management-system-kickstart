import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserRoutingModule } from './user-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './components/user-list/user-list.component';
import { CardComponent } from '../shared/components/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LocationChipListComponent } from './components/location-chip-list/location-chip-list.component';
import { LocationAutocompleteComponent } from './components/location-autocomplete/location-autocomplete.component';
@NgModule({
  declarations: [
    UserCardComponent,
    UserListComponent,
    LocationChipListComponent,
    LocationAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatChipsModule,
    MatAutocompleteModule,
  ],
})
export class UserModule {}
