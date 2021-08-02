import { Revenda, Chaves, ModuloCriar } from 'src/app/2-dados/interface';

export class DadosRevenda {

  chave: Chaves = {
    nome: 'Revenda',
    rotaBancoDados: 'revenda',
    chaveModulo: 'revenda',
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
            moduloNome: 'Administrador',
            url: 'revenda',
            tipo: 'colecao',
            acao: 'lista',
            item: 'aasd',
            icone: '',
            grupo: [
              /*     {
                    moduloNome: 'Nova Revenda',
                    url: 'revenda',
                    tipo: 'control',
                    acao: 'nova',
                    item: '',
                    icone: '',
                  }, */
              {
                moduloNome: 'Revendas',
                url: 'revenda',
                tipo: 'control',
                acao: 'lista',
                item: '',
                icone: '',
              },
              /*        {
                       moduloNome: 'Item',
                       url: 'revenda',
                       tipo: 'control',
                       acao: 'item',
                       item: '2ki5yFynaqQS3r3zZrK6',
                       icone: '',
                     }, */
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

