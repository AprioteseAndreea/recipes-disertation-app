import { Subject, takeUntil, debounceTime } from 'rxjs';
import { SortDirection } from './sort-direction';
import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { SortDirective } from './sort.directive';

const sortClassMapping: { [key: string]: string } = {
  asc: 'sortable sort-asc',
  desc: 'sortable sort-desc',
  '': 'sortable sort-no-sort',
};

const sortDirectionTranslate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

@Component({
  selector: '[sortable]',
  host: {
    '(click)': 'toggleSort()',
  },
  template: `
    <div class="sort-container">
      <div class="sort-content">
        <ng-content></ng-content>
      </div>
      <div class="sort-arrow"></div>
    </div>
  `,
})
export class SortableComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject();

  @Input() sortable: string = '';
  @Input() direction: string = '';

  @HostBinding('class') get hostClass() {
    return sortClassMapping[this.direction];
  }

  constructor(private sort: SortDirective) {
    this.handleSortChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSortChanges() {
    this.sort.sortChange
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((_) => {
        this.direction = this.isSortActive() ? this.sort.direction : '';
      });
  }

  toggleSort() {
    const newSortDirection = sortDirectionTranslate[this.direction];
    this.sort.sort(this.sortable, newSortDirection);
  }

  isSortActive() {
    return (
      this.sort.column === this.sortable &&
      (this.sort.direction === 'asc' || this.sort.direction === 'desc')
    );
  }
}
