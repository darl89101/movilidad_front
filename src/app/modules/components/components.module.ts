import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [SplashScreenComponent, GridComponent],
  imports: [CommonModule],
  exports: [SplashScreenComponent, GridComponent],
})
export class ComponentsModule {}
