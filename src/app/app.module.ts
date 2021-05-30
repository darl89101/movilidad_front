import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components/components.module';
import { AuthInterceptorProvider } from './modules/core/interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from './modules/core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthInterceptorProvider, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
