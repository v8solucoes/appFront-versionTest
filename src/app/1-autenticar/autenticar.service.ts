import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Debug } from '../5-componentes/debug';
import { CriarDadosService } from '../0-criarDados/criarDados.service';

@Injectable({
  providedIn: 'root'
})

export class AutenticarService {
  login = new FormGroup({
    email: new FormControl('teste@v8sites.com.br', Validators.email),
    senha: new FormControl('123456', Validators.minLength(4))
  });

  debug = (pro: any, valor: any) => new Debug('desativado', 'Autenticar', pro, valor);

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public criarDados: CriarDadosService
  ) 
  {
    this.conectar();
  }

  async conectar() {
    try {
      await this.autenticar();
      await this.criarDados.criar(); // Deve estar Autenticado para Gravar
      this.redireciona();
    }
    catch (error) { this.debug('Erro Modo Desenvolvedor', error); }
  }

  async autenticar() {
    try {
      await this.auth.signInWithEmailAndPassword(
        this.login.get(['email']).value,
        this.login.get(['senha']).value)
        .then(conectado => {
          this.debug('Conectou ID: ', conectado.user.uid);
        });
    }
    catch (erro) { return this.mensagemErro(erro); }
  }

  redireciona() {
    const base = 'interface';
    const rota =  localStorage.getItem('rotaUrl') ? localStorage.getItem('rotaUrl') : 'revenda/lista';

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
        console.log(mensagemfalha); alert(mensagemfalha); break;

      default:
        const mensagemdDefaut = 'Erro de Autenticação não informado > ' + erro;
        console.log(mensagemdDefaut); alert(mensagemdDefaut);
        return;
    }
  }
}