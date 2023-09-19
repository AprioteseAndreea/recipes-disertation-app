import { SortDirection } from './sort-direction';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { SortEvent } from './sort-event';

@Directive({
  selector: '[tableSort]',
})
export class SortDirective {
  @Input() direction: string = '';
  @Input() column: string = '';

  @Output() sortChange: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  constructor() {}

  sort(sortColumn: string, sortDirection: SortDirection) {
    this.sortChange.emit({ column: sortColumn, direction: sortDirection });
  }
}
