import { Pipe, PipeTransform } from '@angular/core';
import { CookingLevel } from 'src/app/core/enums/enums';

@Pipe({
  name: 'cookingLevel'
})
export class CookingLevelPipe implements PipeTransform {

  transform(value: number): string {
    return CookingLevel[value].toLowerCase();
  }

}
