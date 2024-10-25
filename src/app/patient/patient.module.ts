import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientCardComponent } from './components/patient-card/patient-card.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../shared/components/card/card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserModule } from '../user/user.module';
import { SearchableSelectComponent } from '../shared/components/searchable-select/searchable-select.component';

@NgModule({
  declarations: [PatientCardComponent, PatientListComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CardComponent,
    MatDatepickerModule,
    UserModule,
    SearchableSelectComponent,
  ],
})
export class PatientModule {}
