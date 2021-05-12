import { Revenda, Chaves, ModuloCriar } from 'src/app/2-dados/interface';

export class DadosRevenda {

  chave: Chaves = {
    nome: 'Revenda sf sasdfad fadfaxdasdf',
    url: 'revenda',
    chaveModulo: 'revenda',
    chaveDados: 'revendaV8dados'
  };

  documento: Revenda = {
    id: 'apresentador02',
    nome: 'Ricardo'
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
            acao: 'lista',
            item: '',
            icone: '',
          },
          {
            moduloNome: 'Revenda',
            url: 'revenda',
            tipo: 'colecaoGaveta',
            acao: 'lista',
            item: 'aasd',
            icone: '',
            grupo: [
              {
                moduloNome: 'Criar',
                url: 'revenda',
                tipo: 'control',
                acao: 'nova',
                item: '',
                icone: '',
              },
              {
                moduloNome: 'Documento',
                url: 'revenda',
                tipo: 'control',
                acao: 'documento',
                item: '',
                icone: '',
              },
              {
                moduloNome: 'Lista',
                url: 'revenda',
                tipo: 'control',
                acao: 'lista',
                item: '',
                icone: '',
              },
              {
                moduloNome: 'Item',
                url: 'revenda',
                tipo: 'control',
                acao: 'item',
                item: 'felix12',
                icone: '',
              },
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

