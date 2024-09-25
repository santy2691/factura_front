import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringAFechas',
  standalone: true
})
export class StringAFechasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
