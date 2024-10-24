import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
  },
  {
    path: 'new',
    component: PatientCardComponent,
  },
  {
    path: ':id/edit',
    component: PatientCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
