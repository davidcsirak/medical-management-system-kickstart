import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationListComponent } from './components/location-list/location-list.component';

const routes: Routes = [
  {
    path: '',
    component: LocationListComponent,
  },
  {
    path: 'new',
    component: LocationCardComponent,
  },
  {
    path: ':id/edit',
    component: LocationCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
