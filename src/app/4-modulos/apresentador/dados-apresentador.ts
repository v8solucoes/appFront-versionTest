import { Apresentador, Chaves, ModuloCriar, Validar } from 'src/app/2-dados/interface';

export class DadosApresentador {

  chave: Chaves = {
    nome: 'Apresentador',
    url: 'apresentador',
    rotaBancoDados: 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/apresentador/lista/',
    chaveModulo: 'apresentador',
    chaveDados: 'apresentadorV8xapweiops'
  };

  documento: Apresentador = {
    apresentadorGaleria: 'apresentador02',
    vozColecao: 'Ricardo',
    /*     sugestao: 'Gostaria de Vender Mais', */
    texto: 'Olá meu nome é Emerson Felix',
    api: 'amazom',
    idioma: 'pt-BR',
    nome: 'Ricardo'
  };

  validar: Validar = {
    apresentador: {

      sugestao:
        [
          { funcao: 'popularCampo', destino: ['texto'] },
        ],

      texto: [
        { funcao: 'nativoRequerido', valor: true },
        { funcao: 'nativoTextoMinimo', valor: 5 },
        { funcao: 'nativoTextoMaximo', valor: 100 }
      ],

      vozColecao: [
        { funcao: 'nativoRequerido', valor: true },
        {
          funcao: 'popularColecaoObjeto',
          destino: ['api'],
          colecao: ['api']
        }
      ]
    }

  };

  colecoes: Pick<Apresentador, 'colecao'> = {
    colecao: {
      voz: {
        'Ricardo': { 'nome': 'Ricardo', 'api': 'amazom' },
        'Polly': { 'nome': 'Polly', 'api': 'google' }
      }
    }
  }

  dados: ModuloCriar = {
    chave: this.chave,
    menu:
    {
      adm: {
        principal: [
          {
            moduloNome: 'Produto',
            url: 'apresentador',
            tipo: 'colecao',
            acao: 'lista',
            item: 'aasd',
            icone: '',
            grupo: [
              {
                moduloNome: 'Apresentador',
                url: 'apresentador',
                tipo: 'control',
                acao: 'lista',
                item: '',
                icone: '',
              },
            ],
          },
        ]
      }
    },
    permissao: {
      apresentador: [
        { id: 'apresentadorGaleria', editar: false, visualizar: true },
        { id: 'vozColecao', editar: false, visualizar: true },
        { id: 'idioma', editar: false, visualizar: true },
        { id: 'sugestao', editar: false, visualizar: true },
        { id: 'texto', editar: false, visualizar: true },
        { id: 'api', editar: false, visualizar: false },
        /*         { id: 'nome', editar: false, visualizar: true }, */
      ]
    },
    modelo: {
      apresentador: {
        modulo: this.chave,
        apresentadorGaleria: {
          nome: 'Apresentador Galeria',
          tipo: 'control',
          inputTipo: 'galeriaHorizontal',
          valor: [null],
          requerido: true,
          cssColuna: 'f-total',
          cssInput: 'fill',
          colecao: {
            tipo: 'lista',
            lista: [
              { id: 'apresentador01', nome: 'Apresentador 1' },
              { id: 'apresentador02', nome: 'Apresentador 2' },
              { id: 'apresentador03', nome: 'Apresentador 3' },
              { id: 'apresentador04', nome: 'Apresentador 4' },
              { id: 'apresentador05', nome: 'Apresentador 5' },
            ],
            pasta: 'assets/modulo/apresentador/modelo/',
            extensao: '.png'
          },
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
          validarAssincrono: []
        },
        vozColecao: {
          nome: 'Voz',
          tipo: 'control',
          inputTipo: 'select',
          requerido: true,
          valor: [null],
          cssColuna: 'f-1-esquerda',
          cssInput: 'fill',
          colecao: {
            tipo: 'objeto',
            objeto: this.colecoes.colecao.voz,
          },
          validarSincrono: this.validar.apresentador.vozColecao,
          validarAssincrono: []
        },
        idioma: {
          nome: 'Idioma',
          tipo: 'control',
          inputTipo: 'select',
          requerido: true,
          valor: [null],
          cssColuna: 'f-1-meio',
          cssInput: 'fill',
          colecao: {
            tipo: 'lista',
            lista: [
              { id: 'pt-BR', nome: 'Português' },
              { id: 'US', nome: 'Ingês' },
              { id: 'ES', nome: 'Espanhol' }
            ]
          },
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
          validarAssincrono: []
        },
        sugestao: {
          nome: 'Sugestão de Textos',
          tipo: 'control',
          requerido: false,
          inputTipo: 'select',
          valor: [null],
          cssColuna: 'f-1-direita',
          cssInput: 'fill',
          colecao: {
            tipo: 'lista',
            lista: [
              { id: 'Esse mês estamos com uma oferta imperdível na compra de ...', nome: 'Oferta Imperdível...' },
              { id: 'Promoção na compra de 2 kits ganhe um desconto de 50% no segundo.', nome: 'Promoção !...' }
            ]
          },
          validarSincrono: this.validar.apresentador.sugestao,
          validarAssincrono: []
        },
        texto: {
          nome: 'Texto',
          tipo: 'control',
          valor: [null],
          requerido: false,
          inputTipo: 'texto-area',
          cssColuna: 'f-total',
          cssInput: 'fill',
          inputContador: 100,
          validarSincrono: this.validar.apresentador.texto,
          validarAssincrono: []
        },
        api: {
          nome: 'API',
          tipo: 'control',
          inputTipo: 'input',
          requerido: true,
          valor: [null],
          cssColuna: 'f-total',
          cssInput: 'fill',
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
          validarAssincrono: [],
        },

      }
    },
    dados: {
      apresentador: {
        item: this.documento,
        lista: {
          felix12: this.documento,
          felix520: this.documento
        }
      }
    },
  };

}

