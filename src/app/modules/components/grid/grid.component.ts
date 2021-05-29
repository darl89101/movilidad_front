import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageDialogService } from '../../core/services/message-dialog.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() columns: { fieldName: string; title: string }[] = [];
  @Input() data: any[];
  @Input() edit = false;
  @Input() delete = false;
  @Output() OnEdit = new EventEmitter<any>();
  @Output() OnDelete = new EventEmitter<any>();

  constructor(private readonly messageDialogService: MessageDialogService) {}

  ngOnInit(): void {}

  clickEdit(item: any) {
    this.OnEdit.emit(item);
  }

  clickDelete(item: any) {
    this.messageDialogService
      .showQuestion('El registro se eliminará permanentemente')
      .then((res) => {
        if (res.isConfirmed) this.OnDelete.emit(item);
      });
  }
}
