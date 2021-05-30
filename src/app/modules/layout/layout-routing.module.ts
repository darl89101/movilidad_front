import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'drivers',
        loadChildren: () =>
          import('../pages/drivers/drivers.module').then(
            (m) => m.DriversModule
          ),
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('../pages/cars/cars.module').then((m) => m.CarsModule),
      },
      {
        path: 'displacements',
        loadChildren: () =>
          import('../pages/displacements/displacements.module').then(
            (m) => m.DisplacementsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
