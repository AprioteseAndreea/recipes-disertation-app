import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {
  transform(value: string): SafeHtml {
    // Use a regular expression to find occurrences of "1.", "2.", etc.
    const regex = /(\d+\.)\s/g;
    return value.replace(regex, '\n$1');
  }
}
