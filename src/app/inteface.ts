import {Resposta as resposta,  } from '../../../construtor/src/construtor/dados/dados.interface'
import {Requisicao as requisicao} from '../../../construtor/src/construtor/requisicao/requisicao.interface'
import {dados_Interface} from '../../../construtor/src/construtor/dist/dadosApp/dadosApp.dados'
export type Credencial = dados_Interface['usuarioAdm']['credencial']
export type Resposta = resposta
export type Requisicao = requisicao