import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DriverModel } from 'src/app/modules/core/models/driver.model';
import { DriverService } from 'src/app/modules/core/services/driver.service';
import { SearchService } from 'src/app/modules/core/services/search.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent implements OnInit, OnDestroy {
  drivers: DriverModel[];
  gridTiltes = [
    {
      fieldName: 'id',
      title: 'Consecutivo',
    },
    {
      fieldName: 'name',
      title: 'Nombre',
    },
  ];
  isLoading$: Observable<boolean>;
  filter: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly driverService: DriverService,
    private readonly searchService: SearchService
  ) {
    this.isLoading$ = this.driverService.isLoading$;
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

  fetch() {
    this.driverService
      .getAll(this.filter)
      .subscribe((drivers) => (this.drivers = drivers));
  }

  edit(item: any) {}

  delete(item: any) {}
}
