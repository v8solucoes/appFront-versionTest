import { Injectable } from '@angular/core';

import * as AWS from "aws-sdk";
export interface SpeechParams {
  Engine?: string;
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

@Injectable({
  providedIn: 'root'
})
export class VozPollyService {

constructor() { }

}
