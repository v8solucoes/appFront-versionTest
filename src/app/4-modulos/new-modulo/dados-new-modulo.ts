import { Chaves } from './../../2-dados/interface';
import { ModuloCriar, NewModulo } from 'src/app/2-dados/interface';

export class DadosNewModulo {

  chave: Chaves = {
    nome: 'New Modulo',
    rotaBancoDados: 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/newModulo/lista/',
    url: 'new-modulo',
    chaveModulo: 'newModulo',
    chaveDados: 'newModuloV8rwrJsoYJbz5'
  };

  documento: NewModulo = {
    galeriaHorizontal: 'foto-01',
    control: 'souControl',
    lista: ['souLista'],
    grupo: {
      control: 'souControl',
      lista: ['souLista1', 'souLista2', 'souLista3'],
    },
    grupoLista: [{
      control: 'souControl',
      lista: ['souLista'],
      grupo: {
        control: 'souControl',
        lista: ['souLista1', 'souLista2', 'souLista3']
      }
    }],
    selecao: 'colecao02',
    total: 'total',
    direita: 'direita',
    esquerda: 'esquerda',
    umDireita: '1 Direita',
    umMeio: '1 Meio',
    umEsquerda: '1 Esquerda',
    doisDireita: '2 Direita',
    doisEsquerda: '2 Esquerda',
  };

  dados: ModuloCriar = {
    chave: this.chave, menu:
    {adm: { principal: [
      {
        moduloNome: 'New Modulo2',
        url: 'new-modulo',
        tipo: 'colecao',
        acao: 'lista',
        item: 'aasd',
        icone: '',
        grupo: [
          {
            moduloNome: 'Documento',
            url: 'new-modulo',
            tipo: 'control',
            acao: 'documento',
            item: '',
            icone: '',
          },
          {
            moduloNome: 'Lista',
            url: 'new-modulo',
            tipo: 'control',
            acao: 'lista',
            item: '',
            icone: '',
          },
          {
            moduloNome: 'Item',
            url: 'new-modulo',
            tipo: 'control',
            acao: 'item',
            item: 'felix12',
            icone: '',
          },
        ],
      },
    ]}},
    permissao: {
      newModulo: [
        { id: 'galeriaHorizontal', editar: false, visualizar: true },
        { id: 'control', editar: false, visualizar: true },
        { id: 'lista', editar: false, visualizar: true },
        {
          id: 'grupo', editar: false, visualizar: true,
          grupo: [
            { id: 'control', editar: false, visualizar: true },
            { id: 'lista', editar: false, visualizar: true }
          ]
        },
        {
          id: 'grupoLista', editar: false, visualizar: true,
          grupo: [
            { id: 'control', editar: false, visualizar: true },
            { id: 'lista', editar: false, visualizar: true },
            {
              id: 'grupo', editar: false, visualizar: true,
              grupo: [
                { id: 'control', editar: false, visualizar: true },
                { id: 'lista', editar: false, visualizar: true }
              ]
            }
          ]
        },
        { id: 'selecao', editar: false, visualizar: true },
        { id: 'total', editar: false, visualizar: true },
        { id: 'esquerda', editar: false, visualizar: true },
        { id: 'direita', editar: false, visualizar: true },
        { id: 'umEsquerda', editar: false, visualizar: true },
        { id: 'umMeio', editar: false, visualizar: true },
        { id: 'umDireita', editar: false, visualizar: true },
        { id: 'doisEsquerda', editar: false, visualizar: true },
        { id: 'umDireita', editar: false, visualizar: true },
        { id: 'umEsquerda', editar: false, visualizar: true },
        { id: 'doisDireita', editar: false, visualizar: true },

      ]
    },
    modelo: {
      newModulo: {
        modulo: this.chave,
        galeriaHorizontal: {
          requerido: false,
          abrirGrupo: false,
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
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'galeriaHorizontal',
          nome: 'Galeria Controle',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        control: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Controle',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        lista: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'LISTA',
          tipo: 'lista',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        grupo: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'GRUPO',
          tipo: 'grupo',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        grupoLista: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'GRUPO LISTA',
          tipo: 'grupoLista',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        selecao: {
          requerido: false,
          abrirGrupo: false,
          colecao: {
            tipo:'lista',
            lista: [
              { id: 'colecao01', nome: 'Coleção 1' },
              { id: 'colecao02', nome: 'Coleção 2' }
            ]
          },
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'select',
          nome: 'Seleção',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        total: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-total',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Total',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        direita: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-metade-direita',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Diretia',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        esquerda: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-metade-esquerda',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Esquerda',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        umDireita: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-1-direita',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'UmDireita',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        umEsquerda: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-1-esquerda',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Um Esquerda',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        umMeio: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-1-meio',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'UmMeio',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        doisDireita: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-2-direita',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Dois Direita',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
        doisEsquerda: {
          requerido: false,
          abrirGrupo: false,
          cssColuna: 'f-2-esquerda',
          cssInput: 'fill',
          icone: false,
          inputContador: false,
          inputDicaDireita: false,
          inputDicaEsquerda: false,
          inputIconeDireito: false,
          inputIconeEsquerdo: false,
          inputTextoDireito: false,
          inputTextoEsquerdo: false,
          inputTipo: 'input',
          nome: 'Dois Esquerda',
          tipo: 'control',
          validarAssincrono: [],
          validarSincrono: [],
          valor: ['xxx'],
        },
      }
    },
    dados: {
      newModulo: {
        item: this.documento,
        lista: {
          felix12: this.documento,
          felix520: this.documento
        }
      }
    },
  };

}

