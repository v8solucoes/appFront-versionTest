import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {

  video: HTMLVideoElement;

  @ViewChild('video')
  set mainVideoEl(el: ElementRef) {

    this.video = el.nativeElement;
    console.log(this.video)

  }

  @ViewChild('videoCopia', { static: true })
  videoCopia: ElementRef<HTMLCanvasElement>;
  $videoCopia: CanvasRenderingContext2D;

  @ViewChild('videoImagem', { static: true })
  videoImagem: ElementRef<HTMLCanvasElement>;
  $videoImagem: CanvasRenderingContext2D;

  constructor(
    public dialogRef: MatDialogRef<VisualizarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
  ) { }

  ngOnInit() {

  }

  removerFundoRGB() {

    const width = this.video.videoWidth;
    const height = this.video.videoHeight;
    /*   height = this.video.videoHeight / 2; */

    this.$videoCopia = this.videoCopia.nativeElement.getContext('2d')
    this.$videoCopia.drawImage(this.video, 0, 0, width, height); // Copia Imagem vídeo

    this.$videoImagem = this.videoImagem.nativeElement.getContext('2d')
    /* console.log(this.video) */

    let frame = this.$videoCopia.getImageData(0, 0, width, height);
    let frameTamanho = frame.data.length / 4;
 /*    console.log(frame.data); */

    for (let i = 0; i < frameTamanho; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
   /*  console.log(frame.data) */
    this.$videoImagem.putImageData(frame, 0, 0);

    if (this.video.paused || this.video.ended) return;

    setTimeout(() => this.removerFundoRGB(), 0);

  }

}
