import { FormGroup } from '@angular/forms';
import { ServicoCredenciaisAcao } from '../../../../interface/servicoCredenciais';
import { Acao, AcaoNomes } from '../../../../interface/variaveis';

// Modulos Pai
export interface Modulos {
  revenda?: Revenda;
  newModulo?: NewModulo;
  apresentador?: Apresentador;
}

// Modulos FILHOS ############################

export type Revenda = {
  id: string;
  nome: string;

};
export type Apresentador = {
  apresentadorGaleria?: string;
  vozColecao?: VozApresentador;
  sugestao?: string;
  texto?: string;
  idioma?: string;
  api?: string;
  tipo?: string;
  nome?: string;
  velocidade?: number;
  entonacao?: number;
  processamento?: boolean;
  cssAlinhamento?: string;
  videoWidth?: number;
  videoHeight?: number;
  videoDuplo?: boolean;
  videoPause?: boolean;
  videoAlgoritimo?: string;
  cssBackground?: string;
  alinhamentoHorizontal?: number;
  alinhamentoVertical?: number;
  corTolerancia?: number;
  corTransparencia?: number;
  corReferencia?: string;
  corRgb?: string;
  colecao?: {
    voz: { [x: string]: Pick<ColecoesCampos, 'api' | 'nome' | 'tipo' | 'velocidade' | 'entonacao'> };
  };
};

export type NewModulo = {
  galeriaHorizontal: string;
  control: string;
  lista: string[];
  grupo: {
    control: string;
    lista: string[];
  };
  grupoLista: {
    control: string;
    lista: string[];
    grupo: {
      control: string;
      lista: string[];
    };
  }[];
  selecao: string;
  total: string;
  direita: string;
  esquerda: string;
  umDireita: string;
  umMeio: string;
  umEsquerda: string;
  doisDireita: string;
  doisEsquerda: string;
};

// TIPOS
export type IdUsuario = 'ZEjRkWCDc1PkuIaFyaWnYqmJY4q1';
export type IdRevenda = 'C0JrcUWVqTQR3sPt8Qqo';
export type IdCliente = 'gfFyiX5IU4OaoXm4BDzX';
export type NomeModulo = 'Revenda' | 'Apresentador' | 'New Modulo';
export type Urls = | 'revenda' | 'stream-video' | 'gravar-video' | 'new-modulo' | 'apresentador';
export type RotaBancoDados = | 'revenda' | 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/newModulo/lista/' | 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/apresentador/lista/';
export type ChaveDados = | 'revendaV8dados' | 'newModuloV8rwrJsoYJbz5' | 'apresentadorV8xapweiops';
export type ChaveModulo = GetNomes<Modulos>;
/* export type Acao = 'usuario' | 'delete' | 'update' | 'salvar' | 'nova' | 'lista' | 'listarColecao' | 'documento' | 'rotaAPIusuario' | 'rotaAPIclienteUsuario' | 'rotaAPIclienteModelo' | 'lista' | 'item'; */
export type nomeTodosCampos = | GetNomes<Revenda> | GetNomes<ColecoesCampos> | GetNomes<NewModulo> | GetNomes<Apresentador>;

// TIPOS MÓDULOS
export type VozApresentador = 'Ricardo' | 'Vitoria' | 'Francisca' | 'Antonio' | 'Daniel';


// CONSTRUTORES ########################

// Modulos
export type GetModulos<T> = {
  permissao: GetPermissao<T>;
  modelo: GetModelo<T>;
  dados: GetDados<T>;
  form?: FormGroup;
  listarTitulo: GetNomes<T>[];
  listarSubTitulo: GetNomes<T>[];
};

// Permissão
export type GetPermissao<T> = {
  id: GetNomes<T>;
  editar: boolean;
  visualizar: boolean;
  grupo?: GetPermissao<T>;
}[];

// Modelo
export type GetModelo<T> = { [K in keyof T]: ModeloCampos } & ModuloConfig;

// Dados
export type GetDados<T> = { item: T; lista: { [x: string]: T } };

// Validar
export type GetValidar<T> = { [K in keyof T]?: GetValidarDados<T> };
export type GetValidarDados<T> = {
  funcao: FuncoesSincronas;
  origem?: GetNomes<T>[];
  destino?: GetNomes<T>[];
  colecao?: GetNomes<ColecoesCampos>[];
  valor?: any;
}[];

// Reutilizáveis
export type GetNomes<T> = { [K in keyof T]: K }[keyof T]; // Retorna> type teste = tese | assf |
export type FuncoesSincronas =
  | 'popularColecaoObjeto'
  | 'popularColecaoLista'
  | 'popularCampo'
  | 'nativoRequeridoTrue'
  | 'nativoRequerido'
  | 'nativoTextoMaximo'
  | 'nativoTextoMinimo'
  | 'converterRgb';

export type MenuPrincipal = Menu[];
export type Permissao = { [K in keyof Modulos]?: GetPermissao<Modulos[K]> };
export type ListarTitulo = { [K in keyof Modulos]?: GetNomes<Modulos[K]>[] };
export type ListarSubTitulo = { [K in keyof Modulos]?: GetNomes<Modulos[K]>[] };
export type Modelo = { [K in keyof Modulos]?: GetModelo<Modulos[K]> };
export type Modulo = { [K in keyof Modulos]?: GetModulos<Modulos[K]> };
export type ModuloUsuario = {
  [x: string]: { [K in keyof GetModulos<any>]?: any };
};
export type Dados = { [K in keyof Modulos]?: GetDados<Modulos[K]> };
export type Validar = { [K in keyof Modulos]?: GetValidar<Modulos[K]> };

// INTERFACES PERSONALIZADAS #############

export type ModuloCriar = Pick<
  TudoModulo,
  'chave' | 'menu' | 'permissao' | 'modelo' | 'dados' | 'listarTitulo' | 'listarSubTitulo'
>;

export type Usuario = Pick<
  TudoModulo,
  'credenciais' | 'design' | 'menu' | 'modulo'
>;

export interface TudoModulo {
  credenciais: Credenciais;
  design: Design;
  menu: {
    adm?: { principal: Menu[] };
    revenda?: { principal: Menu[] } | null;
    cliente?: { principal: Menu[] } | null;
  };
  permissao: Permissao;
  listarTitulo: ListarTitulo;
  listarSubTitulo: ListarSubTitulo;
  modelo: Modelo;
  modulo?: Modulo;
  validar: Validar;
  dados: Dados;
  chave: Chaves;
}

export type Tela = 'celuar' | 'tablet' | 'desktop' | 'modulo';

// Interfaces ##################

export interface Credenciais extends ModuloServico {
  tipo?: 'adm' | 'revenda' | 'cliente';
  idUsuario: IdUsuario;
  revendas: IdRevenda[];
  clientes: IdCliente[];
  usuarioNome?: 'Emerson';
  usuarioEmail?: 'teste@v8sites.com.br';
  idRevenda: IdRevenda;
  idCliente: IdCliente;
  chaveDados: ChaveDados;
  nomeModulo: NomeModulo;
  moduloUrl: Urls;
  modulo: ChaveModulo;
  item?: string;
  acao?: AcaoNomes;
}

export interface Chaves extends ModuloServico {
  nome: NomeModulo;
  rotaBancoDados: RotaBancoDados;
  chaveModulo: ChaveModulo;
  acao?: AcaoNomes;
} 

export interface ModuloServico { moduloServico: boolean}

export interface Rotas {
  acao: ServicoCredenciaisAcao | Acao;
  modulo: ChaveModulo;
  moduloUrl: Urls;
  item: string;

}

export interface RetornoServidor<T> {
  existe: boolean;
  error: string;
  mensagem: string;
  data: T;
}
export interface Design {
  tema:
  | 'pad-tema-black'
  | 'pad-tema-white'
  | 'cus-tema-black'
  | 'cus-tema-white';
  temaFonte: number;
  iniciarMenuFixo: boolean;
}

export interface Menu {
  moduloNome: string;
  url: Urls;
  tipo: 'control' | 'colecao' | 'colecaoGaveta';
  acao: AcaoNomes;
  item: string;
  icone: string | boolean | 'folder';
  grupo?: Menu[];
}

export interface ValidarSincrono {
  funcao: FuncoesSincronas;
  origem?: nomeTodosCampos[];
  destino?: nomeTodosCampos[];
  colecao?: GetNomes<ColecoesCampos>[];
  valor?: any;
}
export interface ModeloCampos {
  tipo: 'control' | 'lista' | 'grupo' | 'grupoLista';
  nome: string | boolean | [];
  requerido: boolean;
  valor?: string[] | number[] | boolean[];
  valorMinimo?: number;
  valorMaximo?: number;
  inputTipo?: 'range' | 'input' | 'radio' | 'texto-area' | 'select' | 'galeriaHorizontal' | 'color';
  cssInput?: 'fill' | 'outline';
  cssColuna?:
  | 'f-total'
  | 'f-metade-esquerda'
  | 'f-metade-direita'
  | 'f-1-direita'
  | 'f-1-meio'
  | 'f-1-esquerda'
  | 'f-2-direita'
  | 'f-2-esquerda';
  colecao?: Colecao;
  icone?: string | boolean;
  validarSincrono?: ValidarSincrono[];
  validarAssincrono?: any;
  abrirGrupo?: boolean;
  inputIconeEsquerdo?: string | boolean;
  inputIconeDireito?: string | boolean;
  inputTextoEsquerdo?: string | boolean;
  inputTextoDireito?: string | boolean;
  inputDicaEsquerda?: string | boolean;
  inputDicaDireita?: string | boolean;
  inputContador?: number | boolean;
}
export interface ColeçãoDados {
  id: any;
  nome?: string;
  dados?: any;
  voz?: VozApresentador;
}
export interface apresentadorGaleriaColecao {

}
export interface Colecao {
  tipo: 'lista' | 'objeto';
  lista?: ColeçãoDados[];
  objeto?: { [x: string]: any };
  pasta?: string;
  extensao?: string;
}

export interface ModuloConfig {
  modulo?: Chaves;

}

export interface DadosFuncao {
  gravarEm?: string;
  colecao?: string;
  propriedade?: string;
  dados?: any;
}

export type ColecoesCampos = {
  nome: string;
  id: string;
  idioma?: 'pt-BR';
  api?: 'amazom' | 'microsoft';
  tipo?:
  | 'standard'
  | 'pt-BR-FranciscaNeural'
  | 'pt-BR-AntonioNeural'
  | 'pt-BR-Daniel'
  | 'neural'
  | 'pt-BR-Heloisa';
  velocidade: number;
  entonacao: number;
  voz: VozApresentador;
  processamento: boolean;
  cssAlinhamento: string;
  videoWidth: number;
  videoHeight: number;
  videoDuplo: boolean;
  videoPause: boolean;
  videoAlgoritimo: string;
  cssBackground: string;
  alinhamentoHorizontal: number;
  alinhamentoVertical: number;
  corTolerancia: number;
  corTransparencia: number;
  corReferencia: string;
  corRgb: string;

};
