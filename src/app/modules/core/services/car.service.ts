import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarModel } from '../models/car.model';

const CAR_URL = `${environment.apiUrl}/cars`;

@Injectable({
  providedIn: 'root',
})
export class CarService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  getAll(filter: string) {
    this.isLoading$.next(true);
    return this.http
      .get<CarModel[]>(`${CAR_URL}?filter=${filter}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  getById(id: number): any {
    this.isLoading$.next(true);
    return this.http
      .get<CarModel>(`${CAR_URL}/${id}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  update(car: CarModel) {
    this.isLoading$.next(true);
    return this.http
      .put<CarModel>(`${CAR_URL}/${car.id}`, car)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  create(car: CarModel) {
    this.isLoading$.next(true);
    return this.http
      .post<CarModel>(`${CAR_URL}`, car)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  delete(id: number) {
    this.isLoading$.next(true);
    return this.http
      .delete(`${CAR_URL}/${id}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }
}
