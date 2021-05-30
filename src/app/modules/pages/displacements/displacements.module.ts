import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisplacementEditComponent } from './displacement-edit/displacement-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplacementListComponent } from './displacement-list/displacement-list.component';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DisplacementListComponent,
  },
  {
    path: ':id',
    component: DisplacementEditComponent,
  },
];

@NgModule({
  declarations: [DisplacementEditComponent, DisplacementListComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class DisplacementsModule {}
