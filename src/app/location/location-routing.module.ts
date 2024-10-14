import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationCardComponent } from './components/location-card/location-card.component';

const routes: Routes = [
  {
    path: '',
    component: LocationCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
