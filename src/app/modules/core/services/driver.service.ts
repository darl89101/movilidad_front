import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DriverModel } from '../models/driver.model';
import { environment } from 'src/environments/environment';

const DRIVER_URL = `${environment.apiUrl}/drivers`;

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  getAll(filter: string) {
    this.isLoading$.next(true);
    return this.http
      .get<DriverModel[]>(`${DRIVER_URL}?filter=${filter}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }
}
