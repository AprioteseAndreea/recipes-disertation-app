import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    // given a name, return initials for first + last name, ignoring middle names
    if (value) {
      return value
        .match(/(^\S\S?|\s\S)?/g)
        .map((v) => v.trim())
        .join('')
        .match(/(^\S|\S$)?/g)
        .join('');
    }

    return 'N/A';
  }
}
