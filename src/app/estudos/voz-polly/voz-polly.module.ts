import { CompartilhadoModule } from '../../compartilhado.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VozPollyComponent } from './voz-polly.component';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule
  ],
  declarations: [VozPollyComponent],
  exports: [VozPollyComponent]
})
export class VozPollyModule { }
