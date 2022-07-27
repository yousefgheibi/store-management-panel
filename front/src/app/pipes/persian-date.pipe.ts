import { Pipe, PipeTransform } from '@angular/core';
import * as momentJalaali from "moment-jalaali";

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {


  transform(value: Date): Date {
    return momentJalaali(value).format('jYYYY/jM/jD');
  }


}
