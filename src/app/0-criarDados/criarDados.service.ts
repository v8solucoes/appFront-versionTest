import { DadosNewModulo } from './../4-modulos/new-modulo/dados-new-modulo';
import {
  Usuario,
  ChaveModulo,
  Menu,
  Modelo,
  Modulo,
  Dados,
  ModuloUsuario,
  RotaBancoDados,
  NewModulo,
} from './../2-dados/interface';

import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Debug } from '../5-componentes/debug';
import { DadosApresentador } from './../4-modulos/apresentador/dados-apresentador';
import { DadosRevenda } from '../4-modulos/revenda/dados-revenda';

@Injectable({
  providedIn: 'root',
})
export class CriarDadosService {
  listaModulo = [
    new DadosNewModulo(),
    new DadosRevenda(),
    new DadosApresentador(),
  ];

  fire = this.firebase.firestore;
  lote = this.fire.batch();

  usuario: Usuario = {
    credenciais: {
      tipo: 'adm',
      idUsuario: 'SOcXlEM1h8REyVGrEPSQQAPxW4g1',
      revendas: ['C0JrcUWVqTQR3sPt8Qqo'],
      clientes: ['gfFyiX5IU4OaoXm4BDzX'],
      usuarioNome: 'Emerson',
      usuarioEmail: 'teste@v8sites.com.br',
      idRevenda: 'C0JrcUWVqTQR3sPt8Qqo',
      idCliente: 'gfFyiX5IU4OaoXm4BDzX',
      chaveDados: 'revendaV8dados',
      modulo: 'apresentador',
      moduloUrl: 'apresentador',
      nomeModulo: 'Apresentador',
      acao: 'listar',
      item: 'xxxxx',
      moduloServico: true
    },
    design: {
      tema: 'pad-tema-black',
      temaFonte: 0,
      iniciarMenuFixo: true,
    },
    menu: {
      adm: {
        principal: this.menu(),
      },
      revenda: null,
      cliente: null,
    },
    modulo: this.modulo(),
  };

  debug = (pro: any, valor: any) =>
    new Debug('ativo', 'CriarDados', pro, valor);

  constructor(public firebase: AngularFirestore) {
    this.debug('Dados', this.usuario);
  }

  async criar() {
    try {
      this.gravar<Usuario>(
        'usuario',
        'uU7GcmNuxlXp7iYqv85jXJpbDQy1',
        this.usuario
      );

      await this.lote.commit();

      return this.debug('Gravou', this.usuario);

    } catch (error) { }
  }

  modulo(): Modulo {
    const modulo = {} as ModuloUsuario;
    const revenda = 'C0JrcUWVqTQR3sPt8Qqo';

    this.listaModulo.forEach((modulos) => {
      const chaveModulo: ChaveModulo = modulos.dados.chave.chaveModulo;
      const rotaBancoDados: RotaBancoDados = modulos.dados.chave.rotaBancoDados;

      modulo[modulos.chave.chaveModulo] = {
        permissao: modulos.dados.permissao[chaveModulo],
        modelo: this.gravar<Modelo>(
          'modelo',
          chaveModulo,
          modulos.dados.modelo[chaveModulo]
        ),
        form: null,
        dados: {
          item: null,
          lista: this.gravarLista<Modelo>(
            rotaBancoDados,
            modulos.dados.dados[chaveModulo].item
          ),
        },
        listarTitulo: modulos.dados.listarTitulo[chaveModulo],
        listarSubTitulo: modulos.dados.listarSubTitulo[chaveModulo],
      };
    });

    return modulo as Modulo;
  }

  menu(): Menu[] {
    const principal = [] as Menu[];

    this.listaModulo.forEach((modulos) => {
      modulos.dados.menu.adm.principal.forEach((menu) => principal.push(menu));
    });

    return principal;
  }

  gravar<T>(caminho, chave, dados): T {
    this.lote.set(this.fire.collection(caminho).doc(chave), dados);
    return null;
  }
  gravarLista<T>(caminho, dados): T {
    const chave = Date.now().toString();

    /*     this.lote.set(this.fire.collection(`${caminho}`).doc(chave), dados); */

    return null;
  }
}
