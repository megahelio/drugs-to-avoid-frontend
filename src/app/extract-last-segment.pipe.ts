import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractLastSegment'
})
export class ExtractLastSegmentPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const segments = (value.split('/').pop() || '').substring(0, 12);
    return segments;
  }

}