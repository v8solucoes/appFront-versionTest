import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterRgb'
})
export class ConverterRgbPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result = this.transformColor(value);

    return result;
  }

  transformColor(value: string) {
    var hex = value;
    var red = parseInt(hex[1] + hex[2], 16);
    var green = parseInt(hex[3] + hex[4], 16);
    var blue = parseInt(hex[5] + hex[6], 16);

    return `{"r":"${red}" , "g":"${green}", "b":"${blue}"}`;
  }
}
