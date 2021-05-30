import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DisplacementModel } from 'src/app/modules/core/models/displacement.model';
import { DisplacementService } from 'src/app/modules/core/services/displacement.service';
import { MessageDialogService } from 'src/app/modules/core/services/message-dialog.service';

@Component({
  selector: 'app-displacement-list',
  templateUrl: './displacement-list.component.html',
  styleUrls: ['./displacement-list.component.scss'],
})
export class DisplacementListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  gridTiltes = [
    {
      fieldName: 'plaque',
      title: 'Placa',
    },
    {
      fieldName: 'origin',
      title: 'Origen',
    },
    {
      fieldName: 'destination',
      title: 'Destino',
    },
    {
      fieldName: 'origin_date',
      title: 'Fecha Origen',
    },
    {
      fieldName: 'destination_date',
      title: 'Fecha Destino',
    },
  ];
  displacements: DisplacementModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly displacementService: DisplacementService,
    private messageDialogService: MessageDialogService
  ) {
    this.isLoading$ = this.displacementService.isLoading$;
  }

  ngOnInit(): void {
    this.fetch();
  }

  edit(item: DisplacementModel) {
    this.router.navigateByUrl(`/displacements/${item.id}`);
  }

  fetch() {
    this.displacementService
      .getAll()
      .subscribe((displacements) => (this.displacements = displacements));
  }

  delete(item: DisplacementModel) {
    this.displacementService.delete(item.id).subscribe(() => {
      this.messageDialogService.showSuccess(
        'Desplazamiento eliminado exitosamente!'
      );
      this.fetch();
    });
  }
}
