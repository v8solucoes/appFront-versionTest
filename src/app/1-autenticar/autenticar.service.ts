import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Debug } from '../5-componentes/debug';
import { CriarDadosService } from '../0-criarDados/criarDados.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Credencial, Requisicao, Resposta } from '../inteface';
import { nomePermissao } from '../../../../construtor/src/construtor/dados/dados.interface';
import { PromiseState } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common/Promise';

@Injectable({
  providedIn: 'root'
})

export class AutenticarService {


  form = new FormGroup({
    nome: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    telefone: new FormControl(null, Validators.required),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmaSenha: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  // user = new FormGroup({
  //   email: new FormControl('', Validators.email),
  //   senha: new FormControl('', Validators.minLength(6)),
  // })


  debug = (pro: any, valor: any) => new Debug('desativado', 'Autenticar', pro, valor);


  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public criarDados: CriarDadosService,
    private _snackBar: MatSnackBar,
    public http: HttpClient
  ) {
    this.conectar();
  }

  async cadastrar(tipoAcesso: nomePermissao) {
    
    try {
      // Cria Autenticação ID
     const data = await this.auth
     .createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('senha').value)
     // Pegar Modelo 
      
     /* Implantar depois modelo da Persmissão */

     // Criar Credencial
     const credencial = this.criarCredencial(data.user.uid, tipoAcesso)
     // Gravar Servidor
     const resposta = await this.requisicaoHttp(credencial)

      this._snackBar.open('Cadastro efetuado com sucesso!' + resposta.mensagem, 'X', { duration: 3000 });

   /*    this.form.reset(); */
     /*  this.router.navigate(['login']); */
    } catch (error) {
      this._snackBar.open(this.mensagemErro(error), 'X', { duration: 9000 });
      console.log(error)

    }
  }
  criarCredencial(id:string, tipoAcesso: nomePermissao): Credencial {

  return {
    usuario: {
      id_adm: (tipoAcesso == 'adm') ? id : 'semID',
      id_revenda: (tipoAcesso == 'revenda') ? id : 'semID',
      id_cliente: (tipoAcesso == 'cliente') ? id : 'semID',
      id_usuario: (tipoAcesso == 'usuario') ? id : 'semID',
      tipoAcesso: tipoAcesso,
      nome: this.form.value.nome,
      email: this.form.value.email,
    },
    modulo: {
      id: `usuario_${tipoAcesso}`,
      nome: `Usuário ${tipoAcesso}`,
      url: "usuario-adm",
      servico: false,
      tipoModulo: tipoAcesso,
    },
    requisicao: {
      ambiente: "ambienteTesteV8",
      acao: 'set',
      item: "sem item",
      itemCriar: id,
      dominio: "localhost",
      dataUpdate: new Date(),
      dataCriacao: new Date(),
    },
  } 

  }
  async requisicaoHttp(credencial:Credencial): Promise<Resposta> {

   const requisicao: Requisicao = {
     credencial,
     dados: credencial
   }
    try {
      const cadastro = await this.http
      .post<Promise<Resposta>>(`${environment.rotaApi}/cadastrar`, requisicao)
      .toPromise()
     return cadastro
    } catch (error) {
      return error
    }
  }


  async conectar() {
    try {
      // await this.logar();
      await this.criarDados.criar(); // Deve estar Autenticado para Gravar
/*       this.redireciona(); */
    }
    catch (error) {
      this.debug('Erro Modo Desenvolvedor', error);
    }
  }
  async logar() {
    try {
      await this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.senha)
        .then((conectado) => {
          this.debug('Conectou ID: ', conectado.user.uid);
        });
      this.form.reset();
      this.router.navigate(['interface']); 
    }
    catch (erro) {
      this._snackBar.open(this.mensagemErro(erro), 'X', { duration: 3000 });
      return this.mensagemErro(erro);
    }
  }

  async resetarSenha() {
    try {
      await this.auth.sendPasswordResetEmail(this.form.value.email)
        .then(() => {
          this._snackBar.open('E-mail de recuperação enviado para a caixa de entrada de ' + this.form.value.email, 'X', { duration: 3000 });
          this.form.reset();
          this.router.navigate(['login']);
        })
    } catch (error) {
      this.form.reset();
      this._snackBar.open('E-mail inválido ', 'X', { duration: 3000 });
    }
  }

 

  redireciona() {
    const base = 'interface';
    const rota = localStorage.getItem('rotaUrl') ? localStorage.getItem('rotaUrl') : 'revenda/lista';

    this.router.navigateByUrl(`${base}/${rota}`);
  }

  autenticado() {
    return new Promise((resolve, reject) => {
      this.auth.authState.subscribe(conectado => {
        if (conectado) {
          this.debug('Autenticado', conectado.uid);
          resolve(conectado.uid);
        } else {
          alert('Desconectado');
          this.router.navigate([``]);
          reject(conectado);
        }
      });
    });
  }

  desconectar() {
    this.auth.signOut();
    this.router.navigate([``]);
  }

  mensagemErro(erro) {

    const tipoErro = erro;

    switch (tipoErro.code) {

      case 'auth/network-request-failed':
        const mensagemfalha = 'Falha na conexão com a Internte. > ' + erro;
        console.log(mensagemfalha); console.log(mensagemfalha); break;
      case 'auth/email-already-in-use':
        return 'Email já cadastrado > ' + erro;
      
      default:
        const mensagemdDefaut = 'Erro de Autenticação não informado > ' + erro;
        console.log(mensagemdDefaut); console.log(mensagemdDefaut);
        return;
    }
  }
 /*  mensagemErro(erro) {

    const tipoErro = erro;

    switch (tipoErro.code) {

      case 'auth/network-request-failed':
        const mensagemfalha = 'Falha na conexão com a Internte. > ' + erro;
        console.log(mensagemfalha); console.log(mensagemfalha); break;
      case 'auth/email-already-in-use':
        const mensagemfalhas = 'Falha na conexão com a Internte. > ' + erro;
        console.log(mensagemfalha); console.log(mensagemfalha); break;

      default:
        const mensagemdDefaut = 'Erro de Autenticação não informado > ' + erro;
        console.log(mensagemdDefaut); console.log(mensagemdDefaut);
        return;
    }
  } */
}


