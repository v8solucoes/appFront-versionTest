import { CompartilhadoModule } from '../../compartilhado.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule
  ],
  declarations: [VideoComponent],
  exports: [ VideoComponent ]
})
export class VideoModule { }
