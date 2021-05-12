import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlModuloPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.trim().replace(/ /g,'-').toLowerCase()
  }

}
