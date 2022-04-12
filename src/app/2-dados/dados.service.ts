import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Debug } from '../5-componentes/debug';

import { AutenticarService } from 'src/app/1-autenticar/autenticar.service';
import { HttpClient } from '@angular/common/http';
import { Usuario, RetornoServidor, Credenciais } from './interface';
import { acao, AcaoNomes } from '../variaveis';
import { Usuario2 } from '../inteface';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  readonly API = `${environment.API}api/documento`;
  const = { acao };
  usuario: Usuario = null;
  usuario2: Usuario2;
  chaveCliente: string;
  chaveUsuario: any;

  debug = (pro: any, valor: any) => new Debug('ativo', 'Dados', pro, valor);

  constructor(
    public autenticar: AutenticarService,
    public auth: AngularFireAuth,
    public fire: AngularFirestore,
    public http: HttpClient
  ) { }

  async usuarioCredenciais() {
    try {
      this.chaveUsuario = await this.autenticar.autenticado();

      this.usuario = await this.getData<Usuario>(acao.usuario);
/*       this.usuario2 = await this.autenticar.requisicaoHttp() */

      this.debug('Usuario', this.usuario);

      return;
    } catch (error) {
      alert('Erro do Servidor:' + error)
      console.log(error);
    }
  }

  async getData<T>(acao: AcaoNomes, dados?: any, credencialServico: Credenciais = null): Promise<T> {

    const chave = this.chaveUsuario;

    const credenciais = this.usuario
      ? credencialServico
        ? credencialServico
        : this.usuario.credenciais
      : null;

    return await this.http
      .post<RetornoServidor<T>>(`${environment.API}`, {
        chave,
        "acao": acao,
        credenciais,
        dados,
      })
      .toPromise()
      .then((data) => {
        if (data.existe) {
          return data.data;
        } else {
          const mensagem = 'Erro Servidor: ' + data.error + data.mensagem;
          console.log(mensagem);
          return;
        }
      });
  }
  async getDataUniversal<T>(
    acao: AcaoNomes,
    dados?: any,
    credencialServico: Credenciais = null
  ): Promise<T> {
    const chave = this.chaveUsuario;
    /*   const credenciais = this.usuario ? this.usuario.credenciais : null; */
    const credenciais = this.usuario
      ? credencialServico
        ? credencialServico
        : this.usuario.credenciais
      : null;
    /*
        alert(this.usuario ? credencialServico ? credencialServico : this.usuario.credenciais : null) */

    return await this.http
      .post<RetornoServidor<T>>(
        `https://testeuniversal.web.app/apresentador/meuApresentador.js`,
        { chave, acao, credenciais, dados }
      )
      .toPromise()
      .then((data) => {
        if (data.existe) {
          return data.data;
        } else {
          const mensagem = 'Erro Servidor: ' + data.error + data.mensagem;
          alert(mensagem);
          console.log(mensagem);
          return;
        }
      });
  }
}
