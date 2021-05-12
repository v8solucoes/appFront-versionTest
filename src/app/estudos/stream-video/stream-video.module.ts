import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamVideoComponent } from './stream-video.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StreamVideoComponent],
  exports:[StreamVideoComponent]
})
export class StreamVideoModule { }
