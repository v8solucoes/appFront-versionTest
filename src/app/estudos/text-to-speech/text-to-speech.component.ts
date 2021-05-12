import { Component, OnInit } from '@angular/core';

// Imports the Google Cloud client library
/* import textToSpeech from '@google-cloud/text-to-speech';
 */
// Import other required libraries
/* const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
 */
@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss']
})
export class TextToSpeechComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.inicar()
  }

  async inicar() {

    
    
     // The text to synthesize
  const text = 'hello, Emerson Felix world!';

  // Construct the request
  const request = {
    GOOGLE_APPLICATION_CREDENTIALS: {
      "type": "service_account",
      "project_id": "v8app-888cd",
      "private_key_id": "6a781aab4eb6c9161221f25fd5779a6593ad7573",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8UkGxBR67Qn38\nnIecGA9dOb0hPbU0vzj6kmtA3t4yGWVUpVt6I5uAqv9YoFn8N+cyeijPwBpKN+wb\nIgoTzHS5ExZi8ADUAUNL/UluzCDv/rgs/EHT5a8x4fRUr/udy0dGxtLHuyHtrLI6\nYPgkPVUh71d0jIJ7mVB9m6+Ghke0lCli1GT3WFMyJRRSYc1cHDBdL52gonUmFDd2\n2qSr9+1Ig2QZ+l5Qx8ZUFvC2+5Gn0/1bav76FDe1FwRuNrTpovBx3jeMqribhrs5\nUEE0t5urwWwsNLYOv2lD2n0ysbtEqcosT0ijSaMo81h7PMxpo6z+Wblxn5b8hseU\npoope/K9AgMBAAECggEADzVivMBkb6G6ZFDihXFOpwFnYWyHBSV+8oLUn+k1GegB\nzkjfDwlvy3+uc3faYeDEjnJdzWP+5jOHS9b/PVjBAcP624P1F9SqR1QYlBbEKjLw\nqMwOfOW1tQTseH0QiE5xs9ORaN6XVNx3ivi90XS/5VJbm7v6kFocrVLfZVvUJU8W\nP+KI5eUARYI8Dy9RDZ9KlwYlkTnh6Rv8yG4vjuFC/MxjA78jZy42EBzrzUvI+cNV\n7AwcMew+jtIC8IG2Ua/7MybJkEqO2h1nGPVC4qJf92299XQs22muz17HtukjkrM7\n6pNwvJc3eso+UwZQ4w2QfAQYnOGAnYBaSeGbThLmAQKBgQDwIdiBdiX/ZSBTK5mG\nMo/DkAcduxv9MEy1mzMWaaW5AWHT2IA3Fv24LpFNRMN0y6MaINIIcSHr0dtIHQtD\nwT8XVk8wc+b1taGOlHrG+XHNqbrPS52QzCtST+kmRgk+V6/hYFCbpmfVxTeozlMs\noqRiiGauluVWfoaPZCHWyDoUfQKBgQDIw/YDqlChZFsxv/r9PdjF4anG5mwqXFu/\nK2JKyAmPh+D76xVDx7jXHpLlSCBFF7Oo7QtsleNX5WYFhbsvuknAIHXwJmYYo7bg\nCt/uxe74Qm9YQ8WxjK+FJo5r1bCnsQY6zquL/7CPOB4s/G6khAhwVnMHMhN36BNB\nNQFvUwbrQQKBgCpw4PIorpiQCAGLICw+vXgD+a4Ahvbd1YD3eDUK4RZsrxyhFDAo\naRlnaZjtgVogL6iLinOhgyxJv+bj8zy7Z+o4//ABXB2rR22KwpRuO/XsfK7sn2Gb\nJED9DKkOEc4p81TzD+wiohF/NNIp/TtTV5huoS9UTh5WaHPpb62lX9aFAoGAV907\na/s78oZDSxCkPfS1TFUown3R1PA6zv2jtOq7FG/5TQdjdRiRksQ0sdfRF6v52vJz\nT4CB0NP6xGv0sjyrTkRmmUWU5S+xN3hK7Or/XPNmW5C9kqjpoDJxnkwVVi6pdU9B\n0LGEigmbW0DXA3UtZEzRZtLJpm6RDrat/BSwMIECgYBZ0PbBiBeJSD2f6UgKtatS\nLJqn6SPkjqDhnDdlOht87f9gsRvrepI8dExnaHi+PtIz+/6j60V8JDRbn3InvTQU\nBXo+p5ULjvPg6oRsgXcXWZITAN37iLRo4nAjgzPWtmgL1mM+Z9I7gaqiVuBQdWyG\nMEmrHiIpXN3gSPFDCFBNTA==\n-----END PRIVATE KEY-----\n",
      "client_email": "v8-text-to-speech@v8app-888cd.iam.gserviceaccount.com",
      "client_id": "117365216710550991070",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/v8-text-to-speech%40v8app-888cd.iam.gserviceaccount.com"
    },
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', SsmlVoiceGender: 'MALE'},
    // select the type of audio encoding
    AudioConfig: {AudioEncoding: 'MP3'},
   
  };

 // Performs the text-to-speech request
/*  const [response] = await client.synthesizeSpeech(request, ); */
 
 // Write the binary audio content to a local file
/*  const writeFile = util.promisify(fs.writeFile);
 await writeFile('output.mp3', response.audioContent, 'binary');
 console.log('Audio content written to file: output.mp3'); */

  }

}
