import { Revenda, Chaves, ModuloCriar } from './../../interfaces-import';
import { acao } from '../../../../../interface/variaveis';

export class DadosRevenda {
  _acao = acao
  chave: Chaves = {
    nome: 'Revenda',
    rotaBancoDados: 'revenda',
    chaveModulo: 'revenda',
    moduloServico: false
  };

  documento: Revenda = {
    id: 'Revenda',
    nome: 'XML REVE '
  };

  /* validar: Validar = {
    revenda: {

    id:
    [

      { funcao: 'popularCampo', destino: ['id'] },
    ],
  }

  }; */

  /* colecoes: Pick<Revenda, 'colecao'> = {
  colecao: {
    voz: {
       'Ricardo': { 'nome': 'Ricardo', 'api': 'amazom' },
       'Polly': { 'nome': 'Polly', 'api': 'google' }
     }}
   } */

  dados: ModuloCriar = {
    chave: this.chave,
    menu: {
      adm: {
        principal: [
          {
            moduloNome: 'Revenda',
            url: 'revenda',
            tipo: 'control',
            acao: acao.listar,
            item: '',
            icone: '',
            grupo: [

            ],
          },
        ]
      }
    },
    permissao: {
      revenda: [
        { id: 'id', editar: false, visualizar: true },
        { id: 'nome', editar: false, visualizar: true },
      ]
    },

    listarTitulo: {
      revenda: ['id', 'nome']
    },
    listarSubTitulo: {
      revenda: ['id', 'nome']
    },

    modelo: {
      revenda: {
        modulo: this.chave,
        id: {
          nome: 'ID',
          tipo: 'control',
          inputTipo: 'input',
          valor: ['testes'],
          requerido: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
        },
        nome: {
          nome: 'Nome',
          tipo: 'control',
          inputTipo: 'input',
          requerido: true,
          valor: ['oisasd'],
          cssColuna: 'f-1-esquerda',
          cssInput: 'fill',
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
        },
      }
    },
    dados: {
      revenda: {
        item: this.documento,
        lista: {
          felix12: this.documento,
          felix520: this.documento
        }
      }
    },
  };

}

