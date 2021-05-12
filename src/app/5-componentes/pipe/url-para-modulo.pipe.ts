import { Pipe, PipeTransform } from '@angular/core';
import { Funcoes } from '../../funcoes';
import { ChaveModulo } from '../../2-dados/interface';

@Pipe({
  name: 'urlparamodulo'
})
export class UrlParaModuloPipe implements PipeTransform {

  transform(value: any, args?: any): any {

  const transforma = value.trim().replace(/-/g, ' ').toLowerCase();

  return Funcoes.convertePadraoJSON(transforma) as ChaveModulo;

  }

}
