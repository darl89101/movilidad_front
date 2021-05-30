import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DisplacementModel } from '../models/displacement.model';

const DISPLACEMENT_URL = `${environment.apiUrl}/displacements`;

@Injectable({
  providedIn: 'root',
})
export class DisplacementService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  getAll(filter: string) {
    this.isLoading$.next(true);
    return this.http
      .get<DisplacementModel[]>(`${DISPLACEMENT_URL}?filter=${filter}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  getById(id: number): any {
    this.isLoading$.next(true);
    return this.http
      .get<DisplacementModel>(`${DISPLACEMENT_URL}/${id}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  update(displacement: DisplacementModel) {
    this.isLoading$.next(true);
    return this.http
      .put<DisplacementModel>(
        `${DISPLACEMENT_URL}/${displacement.id}`,
        displacement
      )
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  create(displacement: DisplacementModel) {
    this.isLoading$.next(true);
    return this.http
      .post<DisplacementModel>(`${DISPLACEMENT_URL}`, displacement)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }

  delete(id: number) {
    this.isLoading$.next(true);
    return this.http
      .delete(`${DISPLACEMENT_URL}/${id}`)
      .pipe(finalize(() => this.isLoading$.next(false)));
  }
}
