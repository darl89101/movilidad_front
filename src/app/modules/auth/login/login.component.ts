import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: ['darl.8910'],
      password: ['123.abc'],
    });
  }

  login() {
    const controls = this.formGroup.controls;
    this.authService
      .login(controls.username.value, controls.password.value)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.accessToken);
        this.router.navigateByUrl('/drivers');
      });
  }
}
