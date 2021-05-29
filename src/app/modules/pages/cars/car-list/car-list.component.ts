import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/modules/core/models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
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
  cars: CarModel[] = [
    {
      driverId: 1,
      driverName: 'Diego Roldán',
      model: 2000,
      plaque: 'KUG19D',
      tradeMark: 'Pulsar',
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  edit(item: CarModel) {
    console.log('edit: ', item);
    this.router.navigateByUrl(`/cars/${item.driverId}`);
  }

  delete(item: any) {
    console.log('delete: ', item);
  }
}
