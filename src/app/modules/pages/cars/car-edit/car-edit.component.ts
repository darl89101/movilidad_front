import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CarModel } from 'src/app/modules/core/models/car.model';
import { DriverModel } from 'src/app/modules/core/models/driver.model';
import { CarService } from 'src/app/modules/core/services/car.service';
import { DriverService } from 'src/app/modules/core/services/driver.service';
import { MessageDialogService } from 'src/app/modules/core/services/message-dialog.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
})
export class CarEditComponent implements OnInit, OnDestroy {
  id: number;
  isLoading$: Observable<boolean>;
  car: CarModel;
  drivers$: Observable<DriverModel[]>;
  previous: CarModel;
  formGroup: FormGroup;
  error = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly carService: CarService,
    private readonly router: Router,
    private readonly driverService: DriverService,
    private messageDialogService: MessageDialogService
  ) {}

  ngOnInit(): void {
    this.loadCar();
  }

  loadCar() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.carService.getById(this.id);
          }

          return of(this.getNewInstance());
        }),
        catchError((error) => {
          this.error = error;
          return of(undefined);
        })
      )
      .subscribe((car: CarModel) => {
        if (!car) {
          this.router.navigate(['/cars'], {
            relativeTo: this.route,
          });
        }

        this.car = car;
        this.previous = Object.assign({}, car);
        this.loadDrivers();
        this.initForm();
      });
  }

  loadDrivers() {
    this.drivers$ = this.driverService.getAll('');
  }

  getNewInstance() {
    return new CarModel();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((m) => m.unsubscribe());
  }

  initForm() {
    if (!this.car) {
      return;
    }

    this.formGroup = this.fb.group({
      driver_id: [this.car.driver_id, Validators.required],
      plaque: [this.car.plaque, Validators.required],
      tradeMark: [this.car.tradeMark, Validators.required],
      model: [this.car.model, Validators.required],
    });
  }

  reset() {
    if (!this.previous) {
      return;
    }

    this.car = Object.assign({}, this.previous);
    this.initForm();
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    this.car = Object.assign(this.car, formValues);

    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.carService
      .update(this.car)
      .pipe(
        tap(() => {
          this.messageDialogService.showSuccess(
            'Carro actualizado exitosamente!'
          );
          this.router.navigate(['/cars', this.car.id]);
        })
      )
      .subscribe((car) => (this.car = car));
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.carService
      .create(this.car)
      .pipe(
        tap(() => {
          this.messageDialogService.showSuccess('Carro creado exitosamente!');
        })
      )
      .subscribe((car) => {
        this.car = car;
        this.router.navigate(['/cars', this.car.id]);
      });
    this.subscriptions.push(sbCreate);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
