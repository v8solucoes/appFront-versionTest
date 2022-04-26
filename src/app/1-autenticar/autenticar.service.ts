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
import { Credencial, Requisicao, Resposta, Nome_Dados } from '../import.inteface';
import { ModeloCredencial } from '../import.construtor';
import { Debugar, _debugar } from '../../../../construtor/src/funcoes/sincronas/debug';

@Injectable({
  providedIn: 'root'
})

export class AutenticarService {

  form = new FormGroup({
    nome: new FormControl('Emerson', Validators.required),
    email: new FormControl('teste@v8sites.com.br', [Validators.required, Validators.email]),
    telefone: new FormControl('1111111', Validators.required),
    senha: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
    confirmaSenha: new FormControl('123456', [Validators.required, Validators.minLength(6)])
  });

  debug = (pro: any, valor: any) => new Debug('ativo', 'Autenticar', pro, valor);

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
  async pegarUsuario2(){
    try {
      const modeloRequisicao = ModeloCredencial.requisicaoUsuario('lerDocumento', 'uU7GcmNuxlXp7iYqv85jXJpbDQy1', 'adm')
      const { data } = await this.requisicaoCrud(modeloRequisicao)
      return data
    } catch (error) {
      return error
    }
  }
  async autenticar(tipoAcesso: Nome_Dados['tipoAcesso']) {

    const d = new Debugar(_debugar.autenticar, 'Criar Autenticar', false)

    try {

      const modeloRequisicao = ModeloCredencial.requisicaoModelo('lerDocumento', tipoAcesso)
      const dataModelo = await this.requisicaoCrud(modeloRequisicao)
      const dataDados = dataModelo.data.dados

      d.bug('Pegou Modelo', dataModelo.data.dados)

      const credencialUsuario = ModeloCredencial.usuario('set', '', {
        requisicao: { 'funcao': 'criarAutenticacao' },
        usuario: {
          nome: this.form.value.nome,
          email: this.form.value.email,
          telefone: this.form.value.email,
          senha: this.form.value.senha
        }
      }
      )[tipoAcesso]

      const { data } = await this.requisicaoFuncao(credencialUsuario, null)

      d.bug('Pegou ID', data)

      const usuarioRequisicao = ModeloCredencial.requisicaoUsuario
        ('set', `${data.uid}`, tipoAcesso, dataDados)
      const usuarioGravar = await this.requisicaoCrud(usuarioRequisicao)

      d.bug('Gravou Usuário', usuarioGravar)

      d.fechar()
      return

    } catch (error) {
      d.bug('Erro Autenticar', error)
      d.fechar()
      return
    }
  }
  async requisicaoCrud(requisicao: Requisicao): Promise<Resposta> {
    try {
      const cadastro = await this.http
        .post<Promise<Resposta>>(`${environment.rotaApi}/cadastrar`, requisicao)
        .toPromise()
      return cadastro
    } catch (error) {
      return error
    }
  }
  async requisicaoFuncao(credencial: Credencial, dados: any): Promise<Resposta> {

    const requisicao: Requisicao = {
      credencial,
      dados
    }
    try {
      const cadastro = await this.http
        .post<Promise<Resposta>>(`${environment.rotaApi}/funcao`, requisicao)
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


