import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    this.isLoading$.next(true);
    return this.http
      .post(`${AUTH_URL}/login`, { usernameOrEmail: username, password })
      .pipe(finalize(() => this.isLoading$.next(false)));
  }
}
