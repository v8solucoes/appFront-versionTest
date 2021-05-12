import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as AWS from 'aws-sdk';
import * as videoMerge from 'video-stream-merger';
import { ActivatedRoute } from '@angular/router';
import { Funcoes } from 'src/app/funcoes';
import { Debug } from 'src/app/5-componentes/debug';
import { Apresentador, ChaveModulo, GetNomes } from 'src/app/2-dados/interface';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';

AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:8eface0a-7adb-494c-94f0-999de0bbd0cc'
});

@Component({
  selector: 'app-apresentador',
  templateUrl: './apresentador.component.html',
  styleUrls: ['./apresentador.component.scss'],
})
export class ApresentadorComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef<HTMLAudioElement>;

  carregar = false;
  carregarAudio = false;
  chaveModulo: ChaveModulo = 'apresentador';
  dados: Apresentador;
  formulario: FormGroup;

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('gravando') gravando: ElementRef<HTMLMediaElement>;
  @ViewChild('download') download: ElementRef;

  audioUrl = '';
  modulo = this.i.usuario;

  moduloPermissao = this.i.usuario.modulo.apresentador.permissao;
  moduloModelo = this.i.usuario.modulo.apresentador.modelo;
  moduloDados = this.i.usuario.modulo.apresentador.dados.documento;
  /* moduloPermissao: ModuloPermissao[] = this.dados.moduloPermissao
  moduloModelo: apresentador_Modelo = this.dados.moduloModelo
  moduloDados: apresentador_Dados = this.dados.moduloDados */
  configuracoes;
  merger = new videoMerge();
  gravarVideo: MediaRecorder;
  disco = []; // incia objeto lista
  status = this.criarStatus;
  debug = true;
  debugs = (pro: any, valor: any) => new Debug('ativo', 'Apresentador', pro, valor);

  constructor(
    public i: InterfaceService,
    public router: ActivatedRoute,
    public caixaDialogo: CaixaDialogoService,
  ) {
    this.start();
  }
  ngOnInit() { }

  async start() {

    try {
      await this.i.getModulo(Funcoes.gravarUrl(this.router.snapshot));
      this.formulario = this.i.usuario.modulo.apresentador.form;
      this.atualizarDados();
      this.carregar = true;

      /*  this.debugs('START', this.i.usuario.modulo.apresentador); */
    } catch (error) { }

  }

  atualizarDados() { this.dados = this.formulario.value; }

  async playAudio() {

    this.carregarAudio = true;

    try {
      this.atualizarDados();
      await this.baixarAudio();
      this.carregarAudio = false;
    } catch (error) { }

  }

  async baixarAudio() {

    let api: any;

    switch (this.dados.api) {

      case 'amazom': api = this.baixarAudioAmazom(); break;

      default: alert('API não encontrada: ' + this.dados.api); break;

    }

    return api;
  }

  baixarAudioAmazom() {

    const parametros = {

      LanguageCode: this.dados.idioma, //'pt-BR'
      VoiceId: this.dados.vozColecao, // Ricardo
      Text: this.dados.texto, // 'Teste 123'

      Engine: 'standard',
      OutputFormat: 'mp3',
      SampleRate: '16000',
      TextType: 'text',
    };

    const carregar = new AWS.Polly.Presigner();

    return new Promise((resolve, reject) => {

      carregar.getSynthesizeSpeechUrl(parametros, 700, (error: Error, url: string) => {
        if (error) {
          console.log('Erro buscar Polly URL: ' + error.message);
          reject(error.message);
        } else {
          this.audio.nativeElement.src = url;
          this.audio.nativeElement.play();
          resolve('');
        }
      }
      );
    });

  }

  async salvar() {

    try {
      this.status.play = false;
      this.status.salvar = false;
      this.atualizarConfiguracoes();
      await this.vozAPI();
      this.configurarAudioeVideo();
      this.merger.start();
      this.configurarGravacao();
      this.iniciarGravacao();
      this.monitorarGravacao();
    }
    catch (error) { console.log(error); }

  }

  get criarStatus() {
    return {
      voltasLoop: 0,
      tempoCorrido: 0,
      tempoTotal: 0,
      parado: false, // nãoe está parado
      tempoLimite: false, // não chegou no limite
      tempoCompleto: false, // nao completo
      play: true, // exibe
      salvar: false, // não exibe
      gravando: null,
      status: 'start'
    };
  }

  atualizarConfiguracoes() {

    const funcao = {

      nome: 'criarObjeto', dadosFuncao: [
        { colecao: 'idVoz', propriedade: 'idVoz_nomeAPI', gravarEm: 'objetoVoz' },
        { colecao: 'idVoz', propriedade: 'idVoz_idioma', gravarEm: 'objetoVoz' },
        { colecao: 'idVoz', propriedade: 'idVoz_nomeApresentador', gravarEm: 'objetoVoz' },
        { colecao: 'idVideo', propriedade: 'urlVideo', gravarEm: 'objetoVoz' },
        { propriedade: 'textoFala', gravarEm: 'objetoVoz' },
      ]
    };

    /*  this.configuracoes = Funcao.criarObjeto(this.formulario, funcao.dadosFuncao, this.moduloModelo)
     if (this.debug) {
       console.group('Configurações API: ')
       console.log(this.configuracoes)
       console.groupEnd()
     } */
  }
  vozAPI() {
    const vozAPI = 'amazom';
    if (vozAPI === 'amazom') {
      return this.vozAmazom();
    } else {
      alert('API Voz :' + vozAPI + ' Não Existe');
      console.log(alert('API Voz :' + vozAPI + ' Não Existe'))
    }
  }
  vozAmazom() {

    const parametros = {

      LanguageCode: 'pt-BR', // "pt-BR"
      VoiceId: 'Ricardo', // "Ricardo"
      Text: 'Bom dia Émerson', // "Bom dia Émerson"
      /* LanguageCode: this.configuracoes.idVoz_idioma, // "pt-BR"
      VoiceId: this.configuracoes.idVoz_nomeApresentador, // "Ricardo"
      Text: this.configuracoes.textoFala, // "Bom dia Émerson" */

      Engine: 'standard',
      OutputFormat: 'mp3',
      SampleRate: '16000',
      TextType: 'text',
    };

    const carregar = new AWS.Polly.Presigner();

    return new Promise((resolve, reject) => {

      carregar.getSynthesizeSpeechUrl(parametros, 700, (error: Error, url: string) => {
        if (error) {
          console.log('Erro buscar Polly URL: ' + error.message);
          reject(error.message);
        } else {
          if (this.debug) {
            console.group('Voz URL: ');
            console.log(url); console.groupEnd();
            resolve(this.audio.nativeElement.src = url);
          }
        }
      }
      );
    });

  }
  configurarAudioeVideo() {

    this.merger.addMediaElement('audio', this.audio.nativeElement);
    this.merger.addMediaElement('video', this.video.nativeElement, {
      mute: true,
      width: 640,
      height: 360,
      draw: (ctx, frame, done) => {
        ctx.drawImage(frame, 0, 0, 640, 360);
        done();
      }
    });

  }
  configurarGravacao() {

    this.gravarVideo = new MediaRecorder(this.merger.result, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: 'video/webm'
    });
    this.disco.length = 0; // limpar disco gravação
    this.gravarVideo.ondataavailable = event => this.disco.push(event.data);
    if (this.debug) {
      console.group('Disco: ');
      console.log(this.disco);
      console.groupEnd();
    }
  }

  iniciarGravacao() {
    this.status = this.criarStatus;
    this.video.nativeElement.muted = true;
    this.video.nativeElement.load();
    this.video.nativeElement.play();
    this.gravarVideo.start();
    this.audio.nativeElement.load();
    this.audio.nativeElement.play();
    this.status.play = false;
  }

  monitorarGravacao() {

    setTimeout(x => {

      console.log('Monitorando Tempo');

      const tempoDuracao = Math.round(this.audio.nativeElement.duration);
      const tempoCorrido = Math.round(this.audio.nativeElement.currentTime);
      const parado = this.gravarVideo.state != 'recording' ? true : false;
      const tempoLimite = this.status.voltasLoop == 120 ? true : false;
      const tempoCompleto = tempoCorrido == tempoDuracao ? true : false;
      const mensagemLimite = 'Diminua o audio. Você ultrapassou tempo limite de audio de 2 minutos / ' + tempoDuracao / 60 + ' min/seg.';

      this.status.tempoCorrido = tempoCorrido;
      this.status.tempoTotal = tempoDuracao;
      this.status.tempoCompleto = tempoCompleto;
      this.status.tempoLimite = tempoLimite;
      this.status.parado = parado;
      this.status.gravando = this.gravarVideo.state;
      this.status.status = 'Gravando...';
      this.status.voltasLoop++;

      if (parado || tempoLimite || tempoCompleto) {

        if (parado) { this.stop('Parado', parado); }
        if (tempoLimite) { this.stop('Tempo Limite Excedido', tempoLimite); alert(mensagemLimite); }
        if (tempoCompleto) {
          this.status.status = 'Tempo Concluido';
          return new Promise((resolve, reject) => {
            this.gravarVideo.onstop = resolve;
            this.gravarVideo.onerror = event => reject(event['name']);
          }).then(x => this.gravarBlob());
        }

      } else { this.monitorarGravacao(); }

    }, 1000);

  }
  stop(problema: string, valor: boolean) {

    valor ? '' : this.gravarVideo.stop();

    this.audio.nativeElement.pause();
    this.video.nativeElement.pause();

    this.status.voltasLoop--;
    this.status.salvar = false;
    this.status.play = true;
    this.status.gravando = this.gravarVideo.state;
    this.status.status = problema + ' / ' + valor;

    if (this.debug) {
      console.group('STOP: ' + problema + ' | Valor: ' + valor);
      console.log(this.disco);
      console.groupEnd();
    };

  }
  gravarBlob() {

    console.group('GravarBlob: Disco / Blob')

    const gravarBlob = new Blob(this.disco, { type: 'video/mp4' });
    this.gravando.nativeElement.src = URL.createObjectURL(gravarBlob);
    this.download.nativeElement.href = this.gravando.nativeElement.src;
    this.download.nativeElement.download = 'VideoGravado.mp4';

    this.status.salvar = true;
    this.status.play = true;
    this.status.gravando = 'gravado';

    console.log(this.disco);
    console.log(gravarBlob);
    console.groupEnd();

  }

/*   videoSelecao(objetoindice) {

    this.formulario.get('idVideo').setValue(objetoindice.id);
    this.formulario.get('idVoz').setValue(objetoindice.idVideo_vozID);
    this.video.nativeElement.src = objetoindice.urlVideo;

  } */



  /*  getDados(nome: GetNomes<Apresentador>) {
     return this.formulario.get('apresentadorGaleria').value;
   } */
}
