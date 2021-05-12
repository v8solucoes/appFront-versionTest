import { HttpClient } from '@angular/common/http';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Debug } from 'src/app/5-componentes/debug';
import { Apresentador, ChaveModulo } from 'src/app/2-dados/interface';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ResultReason, SpeechConfig, SpeechSynthesisOutputFormat, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';


import * as AWS from 'aws-sdk';
import * as admin from 'firebase-admin';

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

  // SALVAR

  fire = this.firebase.firestore;
  lote = this.fire.batch();

  debugs = (pro: any, valor: any) => new Debug('ativo', 'Apresentador', pro, valor);

  constructor(
    public i: InterfaceService,
    public router: ActivatedRoute,
    public caixaDialogo: CaixaDialogoService,
    public firebase: AngularFirestore,
    public http: HttpClient
  ) {
    this.start();
  }
  ngOnInit() { }

  zure() {

    const subscriptionKey = '66afc545afc54ce88190047dc3c8aceb';
    const serviceRegion = 'brazilsouth'; // e.g., "westus"
    const filename = 'YourAudioFile.wav';

    const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3;


    // create the speech synthesizer.
    var synthesizer = new SpeechSynthesizer(speechConfig);

    synthesizer.speakSsmlAsync(`<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
    xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="pt-BR">
  <voice name="pt-BR-FranciscaNeural">
    <mstts:express-as style="cheerful">
     MEU NOME É EMERSON FELIX O CARA BOM!
    </mstts:express-as>
  </voice>
</speak>`,
      function (result) {

        console.log(result);

        if (result.reason === ResultReason.SynthesizingAudioCompleted) {

          var audioCtx = new AudioContext;
          var source = audioCtx.createBufferSource();

          audioCtx.decodeAudioData(result.audioData, function (buffer) {
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.loop = true;
          })

          var blob = new Blob([result.audioData], { type: 'audio/mp3' });
          console.log(URL.createObjectURL(blob));
          this.audio.nativeElement.src = URL.createObjectURL(blob);
          this.audio.nativeElement.src = URL.createObjectURL(blob);

        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
            "\nDid you update the subscription info?");

        }
        synthesizer.close();
        synthesizer = undefined;
      },
      function (error) {
        console.trace("err - " + error);
        synthesizer.close();
        synthesizer = undefined;
      });
    console.log("Now synthesizing to: " + filename);
  }

  async start() {

/*     try {
      await this.i.getModulo(Funcoes.gravarUrl(this.router.snapshot));
      this.formulario = this.i.data.usuario.modulo.apresentador.form;
      this.atualizarDados();
      this.carregar = true;

    } catch (error) { } */

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
      /*     await this.salvarModulo(); */
      await this.api();
      return;

    } catch (error) {

    }
  }

  async api() {
    this.atualizarDados()
    const data = Date.now();

    this.dados

    try {
      /*  this.http.get<ListaDados>(this.API); */
      return this.http.post('http://localhost:3000/apresentador', this.dados)
        .subscribe(
          sucess => console.log('Sucesso: ' + sucess),
          error => console.log('erro: ' + error),
          () => console.log('Completado')
        );
      /*       return this.http.post('https://www.v8loja.com.br/api/documento', 'Cheguei Bem'); */

    } catch (error) {

    }
  }

  async salvarModulo() {

    const chaveCliente = this.i.data.usuario.credenciais.idCliente;
    const chaveDados = this.i.data.usuario.credenciais.chaveDados;
    const chaveLista = 'adfadfadf';
    const dados = this.formulario.value;
    try {
      this.lote.set(this.fire.collection(`apiCliente/${chaveCliente}/moduloDados/${chaveDados}/lista`)
        .doc(chaveLista), dados);
      this.lote.set(this.fire.collection(`apiCliente/${chaveCliente}/moduloDados/`)
        .doc(chaveDados), {
        criacao: new Date(),
        regions: 'SP',
        population: 50,
        atualizacao: new Date(),
        id: this.firebase.createId()
      });

      /*  console.log(admin) */

      await this.lote.commit();
    } catch (error) {

    }
  }

}


/* https://v8loja.com.br/api/documento */
