import { Pipe, PipeTransform } from '@angular/core';
import { PhysicalEffort } from 'src/app/core/enums/enums';

@Pipe({
  name: 'physicalEffort'
})
export class PhysicalEffortPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }

}
