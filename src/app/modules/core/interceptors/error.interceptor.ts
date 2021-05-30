import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageDialogService } from '../services/message-dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageDialogService: MessageDialogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.error && err.error.message) {
          this.messageDialogService.showError(err.error.message);
        } else {
          this.messageDialogService.showError(err.message);
        }
        throw err;
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
