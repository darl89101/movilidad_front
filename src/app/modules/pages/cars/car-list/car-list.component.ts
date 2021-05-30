import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CarModel } from 'src/app/modules/core/models/car.model';
import { CarService } from 'src/app/modules/core/services/car.service';
import { MessageDialogService } from 'src/app/modules/core/services/message-dialog.service';
import { SearchService } from 'src/app/modules/core/services/search.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  gridTiltes = [
    {
      fieldName: 'driverName',
      title: 'Conductor',
    },
    {
      fieldName: 'plaque',
      title: 'Placa',
    },
    {
      fieldName: 'tradeMark',
      title: 'Marca',
    },
    {
      fieldName: 'model',
      title: 'Modelo',
    },
  ];
  cars: CarModel[] = [];
  filter: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly carService: CarService,
    private messageDialogService: MessageDialogService,
    private readonly searchService: SearchService
  ) {
    this.isLoading$ = this.carService.isLoading$;
  }

  ngOnInit(): void {
    this.fetch();
    this.subscriptions.push(
      this.searchService.search$.subscribe((filter) => {
        this.filter = filter;
        this.fetch();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((m) => m.unsubscribe());
  }

  edit(item: CarModel) {
    console.log('edit: ', item);
    this.router.navigateByUrl(`/cars/${item.id}`);
  }

  fetch() {
    this.carService.getAll(this.filter).subscribe((cars) => (this.cars = cars));
  }

  delete(item: CarModel) {
    console.log('delete: ', item);
    this.carService.delete(item.id).subscribe(() => {
      this.messageDialogService.showSuccess('Carro eliminado exitosamente!');
      this.fetch();
    });
  }
}
