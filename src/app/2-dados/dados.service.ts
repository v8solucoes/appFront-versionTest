import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Debug } from '../5-componentes/debug';

import { AutenticarService } from 'src/app/1-autenticar/autenticar.service';
import { HttpClient } from '@angular/common/http';
import { Usuario, Rotas, TudoModulo, Acao, RetornoServidor } from './interface';


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
    /*  console.log('Dados Service'); */
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

    return await this.http.post<RetornoServidor<T>>('http://localhost:3000/firebase',
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

/*   async getDocumento<T>(rota: Rotas): Promise<T> {

    const caminho = this.pegarRota(rota);

    return this.fire.doc<T>(caminho).get().toPromise()
      .then(dados => {
        this.debug('Documentokkk/' + caminho, dados.data());
        return dados.data() as T;
      });
  } */

  async getColecao<T>(rota: Rotas): Promise<T> {

    const caminho = this.pegarRota(rota);

    return this.fire.collection<T>(caminho).get().toPromise()
      .then(dados => {
        const objeto = {};
        dados.forEach(data => {
          objeto[data.id] = data.data();
        });
        objeto['size'] = dados.size;
        this.debug('Coleção/' + caminho, objeto);
        return objeto as T;
      });
  }
  getModulo(modulo, modeloCliente: Pick<TudoModulo, 'modelo'>) {

    for (const key of Object.keys(modulo)) {
      modulo[key].modelo = modeloCliente[key];
    }
    return modulo;
  }

  pegarRota(rota: Rotas): string {

    const chaveCliente = `admCliente/${this.chaveCliente}`;
    const chaveDados = `admDados/${rota.chaveDados}`;
    const chaveDadosLista = `${chaveDados}/lista`;
    const chaveUsuario = this.chaveUsuario;

    switch (rota.acao) {
      case 'rotaAPIusuario': return `admUsuario/${chaveUsuario}`;
      case 'rotaAPIclienteModelo': return `admModelo`;
      case 'rotaAPIclienteUsuario': return `admUsuario/${chaveUsuario}`;
      case 'documento': return chaveDados;
      case 'lista': return chaveDadosLista;
      case 'item': return `${chaveDadosLista}/${rota.item}`;
      default:
        console.log('Rota de Módulo não definida');
        alert('Rota de Módulo não definida');
    }
  }
  /*   pegarRota(rota: Rotas): string {

      const chaveCliente = `apiCliente/${this.chaveCliente}`;
      const chaveDados = `${chaveCliente}/moduloDados/${rota.chaveDados}`;
      const chaveDadosLista = `${chaveDados}/lista`;
      const chaveUsuario = this.chaveUsuario;
      switch (rota.acao) {
        case 'rotaAPIusuario': return `apiUsuario/${chaveUsuario}`;
        case 'rotaAPIclienteModelo': return `${chaveCliente}/moduloModelo`;
        case 'rotaAPIclienteUsuario': return `${chaveCliente}/usuario/${chaveUsuario}`;
        case 'documento': return chaveDados;
        case 'lista': return chaveDadosLista;
        case 'item': return `${chaveDadosLista}/${rota.item}`;
        default:
          console.log('Rota de Módulo não definida');
          alert('Rota de Módulo não definida');
      }
    } */

  /*  documento() {
     return this.http.get<ListaDados>(this.API);
   } */
}
