import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item: any

  constructor() { }

  ngOnInit(): void {

  }
  
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  cancel() {
    this.onCancel.emit()
  }

  delete() {
    this.onDelete.emit(this.item)
  }
}
