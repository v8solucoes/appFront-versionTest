import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoGravarComponent } from './video-gravar.component';
import { CompartilhadoModule } from '../../compartilhado.module';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule,
  ],
  declarations: [VideoGravarComponent],
  exports: [VideoGravarComponent]
})
export class VideoGravarModule { }
