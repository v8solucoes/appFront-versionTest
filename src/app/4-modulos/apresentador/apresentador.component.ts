import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Component, ElementRef, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Debug } from 'src/app/5-componentes/debug';
import { Apresentador, ChaveModulo } from 'src/app/2-dados/interface';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as AWS from 'aws-sdk';

/*AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:8eface0a-7adb-494c-94f0-999de0bbd0cc',});*/

AWS.config.region = 'us-west-2'; // Região
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:62928cfd-1813-4e38-a788-41b8eeb30998',
});

@Component({
  selector: 'app-apresentador',
  templateUrl: './apresentador.component.html',
  styleUrls: ['./apresentador.component.scss'],
})
export class ApresentadorComponent implements OnInit, OnChanges {
  @ViewChild('audio') audio: ElementRef<HTMLAudioElement>;

  carregar = false;
  carregarAudio = false;
  chaveModulo: ChaveModulo = 'apresentador';
  dados: Apresentador;
  formulario: FormGroup;

  // SALVAR

  fire = this.firebase.firestore;
  lote = this.fire.batch();

  debugs = (pro: any, valor: any) =>
    new Debug('ativo', 'Apresentador', pro, valor);

  constructor(
    public i: InterfaceService,
    public router: ActivatedRoute,
    public caixaDialogo: CaixaDialogoService,
    public firebase: AngularFirestore,
    public http: HttpClient
  ) {
    this.router.params.subscribe((o) => {
      this.i.startModulo(this.router.snapshot);
    });
    this.start();


  }
  ngOnInit() { }

  async start() {
    try {
      await this.i.startModulo(this.router.snapshot);
      this.carregar = true;
    } catch (error) { }
  }

  atualizarDados() {
    this.dados = this.i.data.usuario.modulo.apresentador.form.value;
  }

  async playAudio() {
    this.carregarAudio = false;

    try {
      this.atualizarDados();
      await this.baixarAudio();
      this.carregarAudio = true;
    } catch (error) { }
  }

  async baixarAudio() {
    let api: any;

    switch (this.dados.api) {
      case 'amazom':
        api = this.baixarAudioAmazom();

        break;
      case 'microsoft':
        api = this.baixarAudioMicrosoft();

        break;

      default:
        alert('API não encontrada: ' + this.dados.api);
        break;
    }

    return api;
  }
  async baixarAudioMicrosoft() {
    let url = 'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1';

    let headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '66afc545afc54ce88190047dc3c8aceb',
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'webm-24khz-16bit-mono-opus',
    });

    return await this.http.post(
      `${url}`,
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
    xmlns:mstts="https://www.w3.org/2001/mstts"  xml:lang="pt-BR">
  <voice name="${this.dados.tipo}"><prosody rate="${this.dados.velocidade}%" pitch="${this.dados.entonacao}%">
    <mstts:express-as style="cheerful">
    ${this.dados.texto}
    </mstts:express-as>
  </prosody></voice>
</speak>`,
      { headers, responseType: 'blob' }
    )
      .toPromise()
      .then((res) => {
        this.audio.nativeElement.src = URL.createObjectURL(res);
        this.audio.nativeElement.play();
      });
  }

  baixarAudioAmazom() {
    const parametros = {
      LanguageCode: this.dados.idioma, //'pt-BR'
      VoiceId: this.dados.vozColecao, // Ricardo
      Text: `<speak >
  <prosody rate="${this.dados.velocidade + 100}%" pitch="${this.dados.entonacao}%">
    ${this.dados.texto}
  </prosody>
</speak>`, // 'Teste 123'/*${this.dados.velocidade + 50}% ${this.dados.entonacao}%*/,
      Engine: this.dados.tipo,
      OutputFormat: 'mp3',
      SampleRate: '16000',
      TextType: 'ssml',
    };

    const carregar = new AWS.Polly.Presigner();

    return new Promise((resolve, reject) => {
      carregar.getSynthesizeSpeechUrl(
        parametros,
        700,
        (error: Error, url: string) => {
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

  ngOnChanges() {


  }




}
