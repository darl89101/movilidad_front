import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Módulo Layout que contiene el menú
 * y debe contener todas las características generales del portal
 */
@NgModule({
  declarations: [NavbarComponent, LayoutComponent],
  imports: [CommonModule, ReactiveFormsModule, LayoutRoutingModule],
  exports: [NavbarComponent],
})
export class LayoutModule {}
