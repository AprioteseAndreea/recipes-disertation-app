import { SortDirective } from './sort.directive';
import { SortableComponent } from './sortable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SortableComponent, SortDirective],
  exports: [SortableComponent, SortDirective],
  imports: [CommonModule],
})
export class SortModule {}
