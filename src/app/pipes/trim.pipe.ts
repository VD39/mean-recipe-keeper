import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, number ? : number): any {
    if (!value && !number) {
      return value;
    }
    return value.length > number ? `${value.substring(0, number).trim()}....` : value;
  }

}
