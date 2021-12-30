// import { Funcao } from './../../5-componentes/formulario/contrutor/criar-form';

// import { Input } from '@angular/core';
// import { Colecao } from './../../2-dados/interface';
import { NgModuleFactoryLoader } from '@angular/core';
import {
  Apresentador,
  Chaves,
  ModuloCriar,
  Validar,
} from 'src/app/2-dados/interface';

export class DadosApresentador {
  chave: Chaves = {
    nome: 'Apresentador',
    rotaBancoDados: 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/apresentador/lista/',
    chaveModulo: 'apresentador',
  };

  documento: Apresentador = {
    apresentadorGaleria: 'apresentador02',
    vozColecao: 'Ricardo',
    /*     sugestao: 'Gostaria de Vender Mais', */
    texto: 'Olá meu nome é Emerson Felix',
    api: 'amazom',
    idioma: 'pt-BR',
    nome: 'Ricardo',
    velocidade: 0,
    entonacao: 0,
    videoWidth: 364,
    videoHeight: 680,


  };

  validar: Validar = {
    apresentador: {

      sugestao: [
        { funcao: 'popularCampo', destino: ['texto'] }
      ],
      corReferencia: [
        { funcao: 'converterRgb', destino: ['corRgb'], }
      ],

      texto: [
        { funcao: 'nativoRequerido', valor: true },
        { funcao: 'nativoTextoMinimo', valor: 5 },
        { funcao: 'nativoTextoMaximo', valor: 100 },
      ],

      vozColecao: [
        { funcao: 'nativoRequerido', valor: true },
        {
          funcao: 'popularColecaoObjeto',
          destino: ['api', 'tipo', 'velocidade', 'entonacao'],
          colecao: ['api', 'tipo', 'velocidade', 'entonacao'],
        },
      ],

      apresentadorGaleria: [
        { funcao: 'nativoRequerido', valor: true },
        {
          funcao: 'popularColecaoLista',
          origem: ['apresentadorGaleria'],
          destino: ['vozColecao'],
          colecao: ['voz'],
        }
      ],
    },
  };

  colecoes: Pick<Apresentador, 'colecao'> = {
    colecao: {
      voz: {
        Ricardo: { nome: 'Ricardo', tipo: 'standard', api: 'amazom', entonacao: 10, velocidade: 1 },
        Vitoria: { nome: 'Vitória', tipo: 'standard', api: 'amazom', entonacao: 20, velocidade: 2 },
        Francisca: {
          nome: 'Francisca',
          tipo: 'pt-BR-FranciscaNeural',
          api: 'microsoft', entonacao: 40, velocidade: 4
        },
        Antonio: {
          nome: 'Antonio',
          tipo: 'pt-BR-AntonioNeural',
          api: 'microsoft', entonacao: 0, velocidade: 0
        },
        Daniel: {
          nome: 'Daniel',
          tipo: 'pt-BR-Daniel',
          api: 'microsoft', entonacao: 0, velocidade: 0
        },
        Heloisa: { nome: 'Heloisa', tipo: 'pt-BR-Heloisa', api: 'microsoft', entonacao: 0, velocidade: 0 },
      }

    }

  };

  dados: ModuloCriar = {
    chave: this.chave,
    menu: {
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
              {
                moduloNome: 'Gravar Vídeo',
                url: 'gravar-video',
                tipo: 'control',
                acao: 'lista',
                item: '',
                icone: '',
              },
              {
                moduloNome: 'Stream Vídeo',
                url: 'stream-video',
                tipo: 'control',
                acao: 'lista',
                item: '',
                icone: '',
              },
            ],
          },
        ],
      },
    },
    permissao: {
      apresentador: [

        { id: 'vozColecao', editar: false, visualizar: true },
        { id: 'idioma', editar: false, visualizar: true },
        { id: 'sugestao', editar: false, visualizar: true },
        { id: 'texto', editar: false, visualizar: true },
        { id: 'api', editar: false, visualizar: false },
        { id: 'velocidade', editar: false, visualizar: true },
        { id: 'entonacao', editar: false, visualizar: true },
        { id: 'tipo', editar: false, visualizar: false },
        { id: 'processamento', editar: false, visualizar: true },
        { id: 'apresentadorGaleria', editar: false, visualizar: true },
        { id: 'cssAlinhamento', editar: false, visualizar: true },
        { id: 'videoAlgoritimo', editar: false, visualizar: true },
        { id: 'videoWidth', editar: false, visualizar: true },
        { id: 'videoHeight', editar: false, visualizar: true },
        { id: 'videoDuplo', editar: false, visualizar: true },
        { id: 'videoPause', editar: false, visualizar: true },
        { id: 'cssBackground', editar: false, visualizar: true },
        { id: 'alinhamentoHorizontal', editar: false, visualizar: true },
        { id: 'alinhamentoVertical', editar: false, visualizar: true },
        { id: 'corTolerancia', editar: false, visualizar: true },
        { id: 'corTransparencia', editar: false, visualizar: true },
        { id: 'corReferencia', editar: false, visualizar: true },
        { id: 'corRgb', editar: false, visualizar: true },

      ],
    },
    listarTitulo: {
      apresentador: ['nome']
    },
    listarSubTitulo: {
      apresentador: ['tipo']
    },
    modelo: {
      apresentador: {
        modulo: this.chave,
        velocidade: {
          nome: 'Velocidade',
          tipo: 'control',
          inputTipo: 'range',
          requerido: false,
          valor: [0],
          valorMinimo: -100,
          valorMaximo: 200,
          cssColuna: 'f-metade-direita',
        },

        entonacao: {
          nome: 'Entonação',
          tipo: 'control',
          inputTipo: 'range',
          requerido: false,
          valor: [0],
          valorMinimo: -50,
          valorMaximo: 50,
          cssColuna: 'f-metade-esquerda',
        },
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
              { id: 'apresentador01', nome: 'Apresentador 1', voz: 'Antonio' },
              { id: 'apresentador02', nome: 'Apresentador 2', voz: 'Daniel' },
              { id: 'apresentador03', nome: 'Apresentador 3', voz: 'Francisca' },
              { id: 'apresentador04', nome: 'Apresentador 4', voz: 'Ricardo' },
              { id: 'apresentador05', nome: 'Apresentador 5', voz: 'Vitoria' },
            ],
            pasta: 'assets/modulo/apresentador/modelo/',
            extensao: '.png',
          },
          validarSincrono: this.validar.apresentador.apresentadorGaleria,
          validarAssincrono: [],
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
          validarAssincrono: [],
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
              { id: 'ES', nome: 'Espanhol' },
            ],
          },
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
          validarAssincrono: [],
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
              {
                id: 'Esse mês estamos com uma oferta imperdível na compra de ...',
                nome: 'Oferta Imperdível...',
              },
              {
                id: 'Promoção na compra de 2 kits ganhe um desconto de 50% no segundo.',
                nome: 'Promoção !...',
              },
            ],
          },
          validarSincrono: this.validar.apresentador.sugestao,
          validarAssincrono: [],
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
          validarAssincrono: [],
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
        tipo: {
          nome: 'Tipo',
          tipo: 'control',
          inputTipo: 'input',
          requerido: true,
          valor: [null],
          cssColuna: 'f-total',
          cssInput: 'fill',
          validarSincrono: [{ funcao: 'nativoRequerido', valor: true }],
          validarAssincrono: [],
        },
        processamento: {
          nome: 'Processamento',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [false],
        },
        cssAlinhamento: {
          nome: 'Alinhamento',
          tipo: 'control',
          inputTipo: 'select',
          requerido: false,
          cssInput: 'fill',
          cssColuna: 'f-metade-direita',
          valor: [null],
          colecao: {
            tipo: 'lista',
            lista: [{
              id: 'left',
              nome: 'Esquerda',
            },
            {
              id: 'right',
              nome: 'Direita'
            },]
          },
        },
        videoWidth: {
          nome: 'VideoWidth',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [364]

        },
        videoHeight: {
          nome: 'VideoHeight',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [680]

        },
        videoDuplo: {
          nome: 'VideoDuplo',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [true]
        },

        videoPause: {
          nome: 'VideoPause',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [false],
        },
        videoAlgoritimo: {
          nome: '  videoAlgoritimo',
          tipo: 'control',
          inputTipo: 'select',
          requerido: false,
          cssInput: 'fill',
          cssColuna: 'f-metade-esquerda',
          valor: [null],
          colecao: {
            tipo: 'lista',
            lista: [{
              id: 'único',
              nome: 'Único',
            },
            {
              id: 'duplo',
              nome: 'Duplo'
            },]
          },

        },
        cssBackground: {
          nome: 'cssBackground',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [null]
        },
        alinhamentoHorizontal: {
          nome: 'alinhamentoHorizontal',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [100],
        },
        alinhamentoVertical: {
          nome: 'alinhamentoVertical',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [100],
        },
        corTolerancia: {
          nome: 'corTolerancia',
          tipo: 'control',
          inputTipo: 'range',
          cssColuna: 'f-metade-direita',
          requerido: false,
          valor: [100],
        },
        corTransparencia: {
          nome: 'corTransparencia',
          tipo: 'control',
          inputTipo: 'range',
          cssColuna: 'f-metade-esquerda',
          requerido: false,
          valor: [0]
        },
        corReferencia: {
          nome: 'RGB',
          tipo: 'control',
          inputTipo: 'color',
          cssColuna: 'f-metade-esquerda',
          requerido: false,
          valor: ["#000000"],
          validarSincrono: this.validar.apresentador.corReferencia,

        },
        corRgb: {
          nome: 'corRgb',
          tipo: 'control',
          inputTipo: 'input',
          requerido: false,
          valor: [null]

        }







      },
    },
    dados: {
      apresentador: {
        item: this.documento,
        lista: {
          felix12: this.documento,
          felix520: this.documento,
        },
      },
    },
  };
}
