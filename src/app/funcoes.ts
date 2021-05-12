import { ActivatedRouteSnapshot } from '@angular/router';
import { ChaveModulo, Rotas } from './2-dados/interface';

export class Funcoes {

  static convertePadraoURL(texto: string): string {

    return texto.trim().replace(/ /g, '-').toLowerCase();
  }

  static convertePadraoJSON(texto: string): string {

    const transforma = texto.trim()
      .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
      .replace(/ /g, '');

    return transforma.charAt(0).toLowerCase() + transforma.substr(1)

  }
  static converteURLpadraoJSON(texto: string): ChaveModulo {

    const transforma = texto.trim()
      .replace(/-/g, ' ');

    return this.convertePadraoJSON(transforma) as ChaveModulo;
  }

  static gravarUrl(url: ActivatedRouteSnapshot): Rotas {

    // URL LazyLoAD CARREGA no nível parent da url.

    const lazyLoad = url.url.length === 0 ? true : false;
    const parametro = lazyLoad ? url.parent : url;

    const modulo: any = parametro.url[0].path;
    const acao = parametro.params.acao;
    const item = parametro.params.item;

    const rota = { modulo, acao, item };
    const rotaUrl = `${modulo}/${acao}/${item}`;

    localStorage.setItem('rotaUltima', JSON.stringify(rota));
    localStorage.setItem('urlUltima', localStorage.getItem('url'));
    localStorage.setItem('url', rotaUrl);

    return rota;
  }
}

/*
       Explicação:

Primeiro converter a palavra toda em lower case, depois atraves de uma expressao regular
obter a primeira letra e todas as letras que se seguem a um espaço em branco, substituindo esta pela respectiva em letra maiuscula.

A expressão regular:

?: - Faz com que a expressão entre parentesis não seja memorizada
^ - Faz o match à primeira letra da string
| - Operador "ou"
\s - Faz a um espaço em branco
\S - Faz match a um caracter que não seja espaço em branco.
Podes ler mais a fundo sobre expressões regulares em developer.mozilla.org */
