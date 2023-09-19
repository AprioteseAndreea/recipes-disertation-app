import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'charactersRemaining' })
export class CharactersRemainingPipe implements PipeTransform {
  transform(value: string, max_char: number): string {
    let remaining = max_char - (value?.length | 0);
    return remaining + ' characters remaining';
  }
}
