import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Debug } from '../5-componentes/debug';

import { AutenticarService } from 'src/app/1-autenticar/autenticar.service';
import { HttpClient } from '@angular/common/http';
import { Usuario, Acao, RetornoServidor } from './interface';


@Injectable({
  providedIn: 'root'
})
export class DadosService {

  readonly API = `${environment.API}api/documento`;
  usuario: Usuario = null;
  chaveCliente: string;
  chaveUsuario: any;

  debug = (pro: any, valor: any) => new Debug('ativo', 'Dados', pro, valor);

  constructor(
    public autenticar: AutenticarService,
    public auth: AngularFireAuth,
    public fire: AngularFirestore,
    public http: HttpClient,

  ) {
  }

  async usuarioCredenciais() {

    try {

      this.chaveUsuario = await this.autenticar.autenticado();

      this.usuario = (await this.getData<Usuario>('usuario'));

      this.debug('Usuario', this.usuario);

      return;
    }
    catch (error) { console.log(error); }
  }

  async getData<T>(acao: Acao, dados?: any): Promise<T> {

    const chave = this.chaveUsuario;
    const credenciais = this.usuario ? this.usuario.credenciais : null;

    return await this.http.post<RetornoServidor<T>>(`${environment.API}firebase`,
      { chave, acao, credenciais, dados })
      .toPromise().then(data => {
        if (data.existe) {
          return data.data;
        } else {
          const mensagem = 'Erro Servidor: ' + data.error + data.mensagem;
          alert(mensagem); console.log(mensagem);
          return;
        }
      }
      );
  }
}
