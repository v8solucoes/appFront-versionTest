import {Requisicao as requisicao, Resposta as resposta } from '../../../construtor/src/construtor/interface/interface'
import {dados_Interface} from '../../../construtor/src/construtor/dist/dadosApp/dadosApp.dados'
import {dados_Dados} from '../../../construtor/src/construtor/dist/dadosApp/dadosApp.dados'
export type Credencial = dados_Interface['usuarioAdm']['credencial']
export type Resposta = resposta
export type Requisicao = requisicao
export type Usuario2 = dados_Interface
export const UsuarioModelo = dados_Dados