import { Component, OnInit } from '@angular/core';

import * as AWS from "aws-sdk";
export interface SpeechParams {
  Engine?: string;
  LanguageCode: string,
  OutputFormat: string;
  SampleRate: string;
  Text: string;
  TextType: string;
  VoiceId: string;
}
AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:8eface0a-7adb-494c-94f0-999de0bbd0cc"
});

@Component({
  selector: 'app-voz-polly',
  templateUrl: './voz-polly.component.html',
  styleUrls: ['./voz-polly.component.scss']
})
export class VozPollyComponent implements OnInit {

  speechParams: any
  audioURL: string

  voz = new AWS.Polly.Presigner()
  constructor() { }

  ngOnInit() {

    this.speechParams = {
      Engine: "standard",
      LanguageCode: "pt-BR",
      OutputFormat: "mp3",
      SampleRate: "16000",
      Text: "Bom dia Émerson",
      TextType: "text",
      VoiceId: "Ricardo"
    };

  }
  pegar() {

    this.voz.getSynthesizeSpeechUrl(
      this.speechParams,
      700,
      (error: Error, url: string) => {
        if (error) {
          console.log("Erro buscar Polly URL: ");
          console.log(error.message);
        } else {
          this.audioURL = url
          console.log(url);
        }
      }
    )
  }
}
