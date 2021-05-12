import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  video: HTMLVideoElement; /* video: HTMLMediaElement; */
  videoExibir = true;
  videoStatus: any;
  videoGravar: any;
/*   videoGravar: MediaRecorder; */

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

  constructor() {}

  ngOnInit() {

  }

  fechar() { this.video.onclose; this.videoExibir = false; }

  mute() {
    this.video.muted = !this.video.muted;
    this.videoStatus = 'Mute:' + this.video.muted
  }

  pause() {
    this.video.pause();
    this.video.onplaying
    this.videoStatus = 'Pausado: ' + this.video.paused
  }

  play() {
    this.video.play();
    this.videoStatus = 'Play: ' + this.video.ended
  }

  removerFundoRGB() {

    let
      width = this.video.videoWidth,
      height = this.video.videoHeight;
    /*   height = this.video.videoHeight / 2; */

    this.$videoCopia = this.videoCopia.nativeElement.getContext('2d')
    this.$videoCopia.drawImage(this.video, 0, 0, width, height); // Copia Imagem vídeo
   
    this.$videoImagem = this.videoImagem.nativeElement.getContext('2d')
/* console.log(this.video) */

    let frame = this.$videoCopia.getImageData(0, 0, width, height);
    let frameTamanho = frame.data.length / 4;
console.log(frame.data)

    for (let i = 0; i < frameTamanho; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
    console.log(frame.data)
    this.$videoImagem.putImageData(frame, 0, 0);

    if (this.video.paused || this.video.ended) return;

    setTimeout(() => this.removerFundoRGB(), 0)

  }

}
