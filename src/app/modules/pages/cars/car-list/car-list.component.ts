import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarModel } from 'src/app/modules/core/models/car.model';
import { CarService } from 'src/app/modules/core/services/car.service';
import { MessageDialogService } from 'src/app/modules/core/services/message-dialog.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
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

  constructor(
    private readonly router: Router,
    private readonly carService: CarService,
    private messageDialogService: MessageDialogService
  ) {
    this.isLoading$ = this.carService.isLoading$;
  }

  ngOnInit(): void {
    this.fetch();
  }

  edit(item: CarModel) {
    console.log('edit: ', item);
    this.router.navigateByUrl(`/cars/${item.id}`);
  }

  fetch() {
    this.carService.getAll().subscribe((cars) => (this.cars = cars));
  }

  delete(item: CarModel) {
    console.log('delete: ', item);
    this.carService.delete(item.id).subscribe(() => {
      this.messageDialogService.showSuccess('Carro eliminado exitosamente!');
      this.fetch();
    });
  }
}
