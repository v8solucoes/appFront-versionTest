import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartilhadoModule } from '../../compartilhado.module';
import { TextToSpeechComponent } from './text-to-speech.component';



@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule

  ],
  exports: [TextToSpeechComponent],

  declarations: [TextToSpeechComponent]
})
export class TextToSpeechModule { }
