import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const lines = value.split('\n');
    const formattedLines = lines.map(line => {
      if (line.match(/^\d+(?:\.\s+)?(.*)$/)) {
        return `${line}\n`;
      }
      return line;
    });
    return formattedLines.join('\n');
  }
}
