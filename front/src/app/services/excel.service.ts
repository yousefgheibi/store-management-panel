import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  fileName = new Date().toISOString().slice(0, 10);
  constructor() { }


  download_csv(data: any) {
    var csv = '';

    for (let item of data) {
      let i = 0;
      Object.values(item).forEach(()=>{
        csv += Object.values(item)[i] +` , ` ;
        i++;
      })
      
      csv += "\n";
  
      
    }
    console.log(csv);



    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = this.fileName +'.csv';
    hiddenElement.click();
  }
}
