import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DisplacementModel } from 'src/app/modules/core/models/displacement.model';
import { DisplacementService } from 'src/app/modules/core/services/displacement.service';
import { MessageDialogService } from 'src/app/modules/core/services/message-dialog.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-displacement-edit',
  templateUrl: './displacement-edit.component.html',
  styleUrls: ['./displacement-edit.component.scss'],
})
export class DisplacementEditComponent implements OnInit, OnDestroy {
  id: number;
  isLoading$: Observable<boolean>;
  displacement: DisplacementModel;
  previous: DisplacementModel;
  formGroup: FormGroup;
  error = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly displacementService: DisplacementService,
    private readonly router: Router,
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
            return this.displacementService.getById(this.id);
          }

          return of(this.getNewInstance());
        }),
        catchError((error) => {
          this.error = error;
          return of(undefined);
        })
      )
      .subscribe((displacement: DisplacementModel) => {
        if (!displacement) {
          this.router.navigate(['/displacements'], {
            relativeTo: this.route,
          });
        }

        this.displacement = displacement;
        this.previous = Object.assign({}, displacement);
        this.initForm();
      });
  }

  getNewInstance() {
    return new DisplacementModel();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((m) => m.unsubscribe());
  }

  initForm() {
    if (!this.displacement) {
      return;
    }

    this.formGroup = this.fb.group({
      plaque: [this.displacement.plaque, Validators.required],
      origin: [this.displacement.origin, Validators.required],
      destination: [this.displacement.destination, Validators.required],
      origin_date: [
        _moment(this.displacement.origin_date)
          .utcOffset('-0000')
          .format('YYYY-MM-DD'),
        Validators.required,
      ],
      destination_date: [
        _moment(this.displacement.destination_date)
          .utcOffset('-0000')
          .format('YYYY-MM-DD'),
        Validators.required,
      ],
    });
  }

  reset() {
    if (!this.previous) {
      return;
    }

    this.displacement = Object.assign({}, this.previous);
    this.initForm();
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    this.displacement = Object.assign(this.displacement, formValues);

    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.displacementService
      .update(this.displacement)
      .pipe(
        tap(() => {
          this.messageDialogService.showSuccess(
            'Desplazamiento actualizado exitosamente!'
          );
          this.router.navigate(['/displacements', this.displacement.id]);
        })
      )
      .subscribe((displacement) => (this.displacement = displacement));
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.displacementService
      .create(this.displacement)
      .pipe(
        tap(() => {
          this.messageDialogService.showSuccess(
            'Desplazamiento creado exitosamente!'
          );
        })
      )
      .subscribe((displacement) => {
        this.displacement = displacement;
        this.router.navigate(['/displacements', this.displacement.id]);
      });
    this.subscriptions.push(sbCreate);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
