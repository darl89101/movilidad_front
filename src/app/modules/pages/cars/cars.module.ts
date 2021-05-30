import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { ComponentsModule } from '../../components/components.module';
import { CarEditComponent } from './car-edit/car-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CarListComponent,
  },
  {
    path: ':id',
    component: CarEditComponent,
  },
];

@NgModule({
  declarations: [CarListComponent, CarEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
})
export class CarsModule {}
