import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Funcoes } from './../funcoes';

import { CriarForm } from './../5-componentes/formulario/contrutor/criar-form';
import { DadosService } from '../2-dados/dados.service';
import { Debug } from '../5-componentes/debug';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CaixaDialogoService } from '../5-componentes/caixa-dialogo/caixa-dialogo.service';

@Injectable({
  providedIn: 'root'
})

export class InterfaceService {

  eventoEmitter = new EventEmitter<'menuEsquerdo' | 'menuDireito'>();

  carregarModulo = false;

  designUser = {
    tema: 'pad-tema-black',
    temaFonte: 0,
    iniciarMenuFixo: true,
  };

  design = {
    menuScrollBarra: true,
    menuScrollUltimo: 0,
    moduloScrollBarra: true,
    moduloScrollUltimo: 0,
    opcoesFixar: false,
    telaTablet: false,
    telaCelular: false,
    telaDesktop: false,
    telaDesktopTablet: false,
    animaItem: true
  };

  debug = (pro: any, valor: any) => new Debug('ativo', 'InterServ', pro, valor);

  constructor(
    public data: DadosService,
    public caixaDialogo: CaixaDialogoService,
  ) {

    this.start()
  }
  async start(){
    try {
      await this.data.usuarioCredenciais();
      await this.startModulo();
      this.carregarModulo = true;

    } catch (error) {

    }
  }

  async startModulo(url?: ActivatedRouteSnapshot) {

    /* const credenciais = this.data.usuario.credenciais;
   
    Funcoes.gravarUrl(url, credenciais)

    const rota = JSON.parse(localStorage.getItem('url')); */
    const credenciais = this.data.usuario.credenciais;
    
    Funcoes.gravarUrl(url, this.data.usuario.credenciais)

    const rota = JSON.parse(localStorage.getItem('rota'));

    const modulo = this.data.usuario.modulo[rota.modulo]; /* modulo[rota.modulo]; ou modulo.revenda */
    /* const credenciais = this.data.usuario.credenciais; */

    const form = () => CriarForm.grupo(modulo.permissao, modulo.modelo, modulo.dados.item);

    credenciais.chaveDados = modulo.modelo.modulo.chaveDados;
    credenciais.nomeModulo = modulo.modelo.modulo.nome;
    credenciais.modulo = modulo.modelo.modulo.chaveModulo;
    credenciais.acao = rota.acao;
    credenciais.item = rota.item;

    try {

      if (rota.acao === 'nova') {
        modulo.dados.item = null;
        modulo.form = form();
      }
      if (rota.acao === 'item') {

        modulo.dados.item = await this.data.getData('item');
        modulo.dados.lista = await this.data.getData('lista');
        modulo.form = form();
        this.design.animaItem = !this.design.animaItem
      }
      if (rota.acao === 'lista') {
        console.log(modulo.modelo)
        modulo.dados.lista = await this.data.getData('lista');
        modulo.form = form();
      }

    } catch (error) { console.log(error); }

    this.debug(`Modulo: ${rota.acao}/${credenciais.nomeModulo}`, this.data.usuario);

    return;
  }

  voltar() {

    this.data.autenticar.router.navigateByUrl('interface/' + localStorage.getItem('rotaUltima'), { skipLocationChange: true });

  }
  async novo() {
    const modulo = this.data.usuario.credenciais.modulo;
    const formulario = this.data.usuario.modulo[modulo];
    const dados = formulario.form.value
    
    try {
      
      if (this.validar(formulario)) {

        const chave = await this.data.getData('nova', dados);
        this.data.autenticar.router.navigateByUrl(`interface/${modulo}/item/${chave}`);
        this.data.usuario.modulo[modulo].dados.lista = { chave: dados }
        this.debug(`Novo`, chave)

      }

    } catch (error) {

    }

  }

  async update() {

    const modulo = this.data.usuario.credenciais.modulo;
    const chave = this.data.usuario.credenciais.item;
    const formulario = this.data.usuario.modulo[modulo];
    const dados = formulario.form.value

    try {

      if (this.validar(formulario)) {

        const data = await this.data.getData('update',dados);
        this.data.autenticar.router.navigateByUrl(`interface/${modulo}/item/${chave}`);
        this.debug(`Update`, dados)
        this.data.usuario.modulo[modulo].dados.lista[chave] = dados

      }


    } catch (error) {

    }

  }

  validar(modulo) {

    if (modulo.form.invalid) {

      this.caixaDialogo.validar('250px', this.verificaValidacao(modulo.form), modulo.modelo);

    } else {

      return true;
    }

    return false;

  }

  verificaValidacao(formulario: FormGroup) {

    const lista = [];

    Object.keys(formulario.controls).forEach((campo: string) => {

      const controle = formulario.get(campo);

      if (controle.invalid) { lista.push(campo); }

      if (controle instanceof FormGroup) {
        lista.push(this.verificaValidacao(controle));
      }

    });

    return lista;
  }
  fecharMenu() {

    this.designUser.iniciarMenuFixo && this.design.telaDesktop ? '' : this.eventoEmitter.emit('menuEsquerdo');
  }

  ocultarBarraMenu(evento: any, nomeScroll: 'menu' | 'modulo') {

    const scrollAtual = evento.srcElement.scrollTop;

    this.design[nomeScroll + 'ScrollBarra'] = (this.design[nomeScroll + 'ScrollUltimo'] > scrollAtual) ? true : false;
    this.design[nomeScroll + 'ScrollUltimo'] = scrollAtual;

  }

/*   get tela() {

    const tela = window.screen.width;
    const celular = 560;

    const desktop = 1020;

    return {
      celular: () => (tela <= (celular+1)) ? true : false,
      desktop: () => (tela >= (desktop-1)) ? true : false,
      tablet:  () => (tela >= celular && tela <= (desktop)) ? true : false,
      pixels: () => window.screen.width,
      scroll: (evento) => {
        alert('scroll')
        console.log(evento)

      }
    }

  } */
}
