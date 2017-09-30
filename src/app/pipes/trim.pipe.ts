// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})

export class TrimPipe implements PipeTransform {
  /**
   * Trims the length of the value.
   * @param value {any} Orginal value
   * @param number {number} Length number
   */
  transform(value: any, number?: number): any {
    if (!value && !number) {
      return value;
    }
    return value.length > number ? `${value.substring(0, number).trim()}....` : value;
  }
}
