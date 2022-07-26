import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment-jalaali";

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {


  transform(value: Date): Date {
    return moment(value, 'YYYY-M-D').endOf('jMonth').format('jYYYY/jM/jD')
  }


}
