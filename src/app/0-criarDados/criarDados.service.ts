import { Usuario, ChaveModulo, Menu, Modelo, Modulo, Dados, ModuloUsuario } from './../2-dados/interface';

import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Debug } from '../5-componentes/debug';
import { DadosApresentador } from './../4-modulos/apresentador/dados-apresentador';
import { DadosNewModulo } from '../4-modulos/new-modulo/dados-new-modulo';
import { DadosRevenda } from '../4-modulos/revenda/dados-revenda';

@Injectable({
  providedIn: 'root'
})

export class CriarDadosService {

  listaModulo = [new DadosRevenda(), new DadosApresentador(), new DadosNewModulo()];

  fire = this.firebase.firestore;
  lote = this.fire.batch();

  usuario: Usuario = {
    credenciais: {
      tipo: 'adm',
      idUsuario: 'ZEjRkWCDc1PkuIaFyaWnYqmJY4q1',
      revendas: ['ZEjRkWCDc1PkuIaFyaWnYqmJY4q1'],
      clientes: ['C0JrcUWVqTQR3sPt8Qqo'],
      usuarioNome: 'Emerson',
      usuarioEmail: 'teste@v8sites.com.br',
      idRevenda: 'C0JrcUWVqTQR3sPt8Qqo',
      idCliente: 'd29xPsKlwsxxA8TgdvsT',
      chaveDados: 'revendaV8dados',
      modulo: 'apresentador',
      nomeModulo: 'Apresentador',
      acao: 'lista',
      item: 'xxxxx'
    },
    design: {
      tema: 'pad-tema-black',
      temaFonte: 0,
      iniciarMenuFixo: true,
    },
    menu: {
      adm: {
        principal: this.menu()
      },
      revenda: null,
      cliente: null,
    },
    modulo: this.modulo()
  };

  debug = (pro: any, valor: any) => new Debug('ativo', 'CriarDados', pro, valor);

  constructor(public firebase: AngularFirestore) { this.debug('Dados', this.usuario); }

  async criar() {

    try {

      this.gravar<Usuario>('usuario', 'ZEjRkWCDc1PkuIaFyaWnYqmJY4q1', this.usuario);

      await this.lote.commit();

      return this.debug('Gravou', this.usuario);


    } catch (error) { }
  }

  modulo(): Modulo {

    const modulo = {} as ModuloUsuario;
    const revenda = 'C0JrcUWVqTQR3sPt8Qqo';

    this.listaModulo.forEach((modulos) => {

      const chaveModulo: ChaveModulo = modulos.dados.chave.chaveModulo;

      modulo[modulos.chave.chaveModulo] = {

        permissao: modulos.dados.permissao[chaveModulo],
        modelo: this.gravar<Modelo>('modelo', chaveModulo, modulos.dados.modelo[chaveModulo]),
        form: null,
        dados: {
          item: this.gravar<Dados>(`revenda/${revenda}/dados/`, chaveModulo, modulos.dados.dados[chaveModulo].item),
          lista: this.gravarLista<Modelo>(`revenda/${revenda}/dados/${chaveModulo}/lista/`, modulos.dados.dados[chaveModulo].lista)
        }
      };

    });

    return modulo as Modulo;

  }

  menu(): Menu[] {

    const principal = [] as Menu[];

    this.listaModulo.forEach(modulos => {

      modulos.dados.menu.adm.principal.forEach(menu => principal.push(menu));

    });

    return principal;
  }

  gravar<T>(caminho, chave, dados): T {

    this.lote.set(this.fire.collection(caminho).doc(chave), dados );
    return null;
  }
  gravarLista<T>(caminho, dados): T {

    for (const key of Object.keys(dados)) {

      this.lote.set(this.fire.collection(`${caminho}`)
        .doc(key), dados[key]);
    }

    return null;
  }

  /* objeto<T>(dados: 'permissao' | 'modelo', acao: 'gravarUsuario' | 'gravarFirebaseModelo'): T {

    const objeto = {};

    this.listaModulo.forEach(modulos => {

      const chaveModulo: ChaveModulo = modulos.dados.chave.chaveModulo;

      if ( acao === 'gravarUsuario') {
        objeto[chaveModulo] = modulos.dados[dados][chaveModulo];
       }
      if ( acao === 'gravarFirebaseModelo') {
      this.lote.set(this.fire.collection(`modelo`).doc(chaveModulo), modulos.dados[dados][chaveModulo]);
      }

    });
    if (acao === 'gravarUsuario') { return objeto as T; }
    if (acao === 'gravarFirebaseModelo') { return objeto as T; }

  }
  permissao(): Permissao {

    const permissao = {};

    this.listaModulo.forEach(modulos => {

      const chaveModulo: ChaveModulo = modulos.dados.chave.chaveModulo;

      permissao[chaveModulo] = modulos.dados.permissao[chaveModulo];

    });

    return permissao;
  }
  modelo(): Modelo {

    const modelo = {};

    this.listaModulo.forEach(modulos => {

      const chaveModulo: ChaveModulo = modulos.dados.chave.chaveModulo;

      modelo[chaveModulo] = {
        modelo: modulos.dados.modelo[chaveModulo],
      };

    });

    return modelo as Modelo;
  }

  gravar(usuario: Usuario) {

    const admChave = usuario.credenciais.chaveUsuarioGoogleAuth;
    var admModelo = {};

    this.lote.set(this.fire.collection('usuario').doc(admChave), usuario);

    this.listaModulo.forEach(modulos => {

      const chaveModulo = modulos.dados.chave.chaveModulo;
      const chaveDados = modulos.dados.chave.chaveDados;

      const modelo = modulos.dados.modelo[chaveModulo];
      const documento = modulos.dados.dados[chaveModulo].documento;
      const lista = modulos.dados.dados[chaveModulo].lista;
      admModelo[chaveModulo] = modelo;

      this.lote.set(this.fire
        .collection(`modelo`)
        .doc(chaveModulo), modelo);


    });
    return;

  }
  gravarUsuario(usuario: Usuario) {

    const admChave = usuario.credenciais.chaveUsuarioGoogleAuth;

    this.lote.set(this.fire.collection('usuario').doc(admChave), usuario);

    return;
  }
  gravarDados(usuario: Usuario) {

    const chaveUsuario = usuario.credenciais.chaveUsuarioGoogleAuth;
    const chaveCliente = usuario.credenciais.chaveCliente;

    this.lote.set(this.fire.collection('admUsuario/').doc(chaveUsuario), usuario);
    this.lote.set(this.fire.collection(`admCliente/${chaveCliente}/usuario`).doc(chaveUsuario), usuario);

    this.listaModulo.forEach(modulos => {

      const chaveModulo = modulos.dados.chave.chaveModulo;
      const chaveDados = modulos.dados.chave.chaveDados;

      const modelo = modulos.dados.modelo[chaveModulo];
      const documento = modulos.dados.dados[chaveModulo].documento;
      const lista = modulos.dados.dados[chaveModulo].lista;

      for (const key of Object.keys(lista)) {

        this.lote.set(this.fire.collection(`admDados/${chaveDados}/lista/`)
          .doc(key), lista[key]);
      }

      this.lote.set(this.fire.collection(`admModelo`).doc(chaveModulo), modelo);
      this.lote.set(this.fire.collection(`admDados`).doc(chaveDados), documento);
      this.lote.set(this.fire.collection(`adm`).doc('lista/revenda'), { id: 'xxxxasdfad', nome: 'V8 Sites', });
    });

  }

}
 */
}
