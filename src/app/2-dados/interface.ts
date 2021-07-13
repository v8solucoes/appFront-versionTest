import { FormGroup } from '@angular/forms';

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
}
export type Apresentador = {
  apresentadorGaleria?: string;
  vozColecao?: string
  sugestao?: string;
  texto?: string;
  idioma?: string;
  api?: string;
  nome?: string;
  colecao?: {
    voz: { [x: string]: Pick<ColecoesCampos, 'api' | 'nome' >}
  }
};
export type NewModulo = {

  galeriaHorizontal: string;
  control: string;
  lista: string[]
  grupo: {
    control: string;
    lista: string[]
  }
  grupoLista: {
    control: string;
    lista: string[];
    grupo: {
      control: string;
      lista: string[];
    }
  }[],
  selecao: string;
  total: string
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
export type Urls = 'revenda' | 'new-modulo' | 'apresentador';
export type RotaBancoDados = 'revenda' 
  | 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/newModulo/lista/' 
  | 'cliente/gfFyiX5IU4OaoXm4BDzX/dados/apresentador/lista/'  ;
export type ChaveDados =  'revendaV8dados' | 'newModuloV8rwrJsoYJbz5' | 'apresentadorV8xapweiops' ;
export type ChaveModulo = GetNomes<Modulos>;
export type Acao = 'usuario' | 'update' | 'nova' | 'lista' | 'listarColecao' |'documento' | 'rotaAPIusuario' | 'rotaAPIclienteUsuario' | 'rotaAPIclienteModelo' | 'lista' | 'item';
export type nomeTodosCampos = GetNomes<Revenda> | GetNomes<ColecoesCampos> | GetNomes<NewModulo> | GetNomes<Apresentador>;


// CONSTRUTORES ########################

// Modulos
export type GetModulos<T> = {
  permissao: GetPermissao<T>;
  modelo: GetModelo<T>;
  dados: GetDados<T>;
  form?: FormGroup;
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
  funcao: FuncoesSincronas
  origem?: GetNomes<T>[];
 destino?: GetNomes<T>[];
 colecao?: GetNomes<ColecoesCampos>[];
 valor?: any
}[];

// Reutilizáveis
export type GetNomes<T> = { [K in keyof T]: K }[keyof T]; // Retorna> type teste = tese | assf |
export type FuncoesSincronas = 'popularColecaoObjeto' | 'popularCampo' | 'nativoRequeridoTrue' | 'nativoRequerido' | 'nativoTextoMaximo' | 'nativoTextoMinimo';


export type MenuPrincipal = Menu[];
export type Permissao = { [K in keyof Modulos]?: GetPermissao<Modulos[K]> };
export type Modelo =    { [K in keyof Modulos]?: GetModelo<Modulos[K]> };
export type Modulo =    { [K in keyof Modulos]?: GetModulos<Modulos[K]> };
export type ModuloUsuario = { [x: string]: {[K in keyof GetModulos<any>]?: any} };
export type Dados =     { [K in keyof Modulos]?: GetDados<Modulos[K]> };
export type Validar =   { [K in keyof Modulos]?: GetValidar<Modulos[K]> };

// INTERFACES PERSONALIZADAS #############

export type ModuloCriar = Pick<TudoModulo,
  'chave' | 'menu' | 'permissao' | 'modelo' | 'dados'>;

export type Usuario = Pick<TudoModulo,
'credenciais' | 'design' | 'menu' | 'modulo'> ;

export interface TudoModulo {
  credenciais: Credenciais;
  design: Design;
  menu: {
    adm?: { principal: Menu[] }
    revenda?: { principal: Menu[] } | null;
    cliente?: { principal: Menu[] } | null;
  };
  permissao: Permissao;
  modelo: Modelo;
  modulo?: Modulo;
  validar: Validar;
  dados: Dados;
  chave: Chaves;
}

export type Tela = 'celuar' | 'tablet' | 'desktop' | 'modulo';

// Interfaces ##################

export interface Credenciais {
  tipo?: 'adm' | 'revenda' | 'cliente';
  idUsuario: IdUsuario;
  revendas: IdRevenda[];
  clientes: IdCliente[];
  usuarioNome?: 'Emerson';
  usuarioEmail?: 'teste@v8sites.com.br';
  idRevenda: IdRevenda;
  idCliente: IdCliente;
  chaveDados: ChaveDados;
  modulo: ChaveModulo;
  nomeModulo: NomeModulo;
  item?: string;
  acao?: Acao;
}

export interface Chaves {
  nome: NomeModulo;
  url: Urls;
  rotaBancoDados: RotaBancoDados;
  chaveDados: ChaveDados;
  chaveModulo: ChaveModulo;
  acao?: Acao;
}

export interface Rotas {
  acao: Acao;
  modulo: Urls;
  item?: string;
  chaveDados?: ChaveDados;
  chaveModelo?: ChaveModulo;
}

export interface RetornoServidor<T> {
  existe: boolean;
  error: string;
  mensagem: string;
  data: T;
}
export interface Design {
  tema: 'pad-tema-black' | 'pad-tema-white' | 'cus-tema-black' | 'cus-tema-white';
  temaFonte: number;
  iniciarMenuFixo: boolean;
}

export interface Menu {
  moduloNome: string;
  url: Urls;
  tipo: 'control' | 'colecao' | 'colecaoGaveta';
  acao: Acao;
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
  valor?: string[];
  inputTipo?: 'input' | 'texto-area' | 'select' | 'galeriaHorizontal';
  cssInput?: 'fill' | 'outline';
  cssColuna?: 'f-total' | 'f-metade-esquerda' | 'f-metade-direita' | 'f-1-direita' | 'f-1-meio' | 'f-1-esquerda' | 'f-2-direita' | 'f-2-esquerda';
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
  inputContador?: number | boolean ;
}
export interface ColeçãoDados {
  id?: any;
  nome?: string;
  dados?: any;
}

export interface Colecao {
  tipo: 'lista' | 'objeto';
  lista?: ColeçãoDados[];
  objeto?: {[ x: string] : any;};
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
  idioma?: 'pt-BR'  ;
  api?: 'amazom' | 'google' ;
}
