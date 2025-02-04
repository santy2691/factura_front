import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';


@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date): String {
    moment.locale('es');
    return moment(value).fromNow();
  }

}
