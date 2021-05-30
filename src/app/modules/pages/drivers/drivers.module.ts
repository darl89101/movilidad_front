import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './driver-list/driver-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DriverListComponent,
  },
  // {
  //   path: ':id',
  //   component: DriverListComponent,
  // },
];

@NgModule({
  declarations: [DriverListComponent],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
})
export class DriversModule {}
