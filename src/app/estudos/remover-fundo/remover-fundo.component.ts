import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Não inverter a sequência abaixo:
import '@tensorflow/tfjs-backend-cpu'; 
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-core';
import * as bodyPix from '@tensorflow-models/body-pix';

@Component({
  selector: 'app-remover-fundo',
  templateUrl: './remover-fundo.component.html',
  styleUrls: ['./remover-fundo.component.scss']
})
export class RemoverFundoComponent implements OnInit {

  status: string
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement>;
  @ViewChild('imagem', { static: true }) imagem: ElementRef<HTMLImageElement>
  @ViewChild('background', { static: true }) background: ElementRef<HTMLImageElement>
  @ViewChild('videoImagem', { static: true })
  videoImagem: ElementRef<HTMLCanvasElement>;
  $videoImagem: CanvasRenderingContext2D;

  @ViewChild('videoCopia', { static: true })
  videoCopia: ElementRef<HTMLCanvasElement>;
  $videoCopia: CanvasRenderingContext2D;
 // Convert the segmentation into a mask to darken the background.
  foregroundColor = {r: 0, g: 0, b: 200, a: 0};
  backgroundColor = {r: 190, g: 191, b: 13, a: 255};
/*   backgroundColor = {r: 0, g: 128, b: 0, a: 255}; */
  backgroundDarkeningMask :any

  opacity = 1;
  maskBlurAmount = 1  ;
  flipHorizontal = false;

  segmentation:any
  net: any
  constructor() { }

  ngOnInit() {

  }
  pause() {
    this.video.nativeElement.pause();
    this.video.nativeElement.onplaying
   /*  this.status = 'Play: ' + this.video.nativeElement.ended + 'Pause: ' + this.video.nativeElement.paused */
  }
  async play() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
    let videoElm = this.video.nativeElement;
    videoElm.srcObject = stream;
    this.status = 'Play: ' + this.video.nativeElement.ended + 'Pause: ' + this.video.nativeElement.paused

  }
  async init() {
   /*  this.video.nativeElement.play(); */
    this.net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 4
    })    
    
    this.$videoImagem = this.videoImagem.nativeElement.getContext('2d')
    this.$videoCopia = this.videoCopia.nativeElement.getContext('2d')
    
    this.atualizarFrame()
  }

  async atualizarFrame(){

    let segmentation = await this.net.segmentPerson(this.video.nativeElement, {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.70,
      maxDetections: 10,
      scoreThreshold: 0.2,
      nmsRadius: 20,
    })

    this.backgroundDarkeningMask = bodyPix.toMask(
      segmentation, this.foregroundColor, this.backgroundColor)

    bodyPix.drawMask(
      this.videoImagem.nativeElement, this.video.nativeElement, this.backgroundDarkeningMask, this.opacity,
       this.maskBlurAmount, this.flipHorizontal)


       let frame = this.$videoImagem.getImageData(0, 0, 640, 480);
       
       let frameTamanho = frame.data.length / 4;

       for (let i = 0; i < frameTamanho; i++) {
         let r = frame.data[i * 4 + 0];
         let g = frame.data[i * 4 + 1];
         let b = frame.data[i * 4 + 2];
         if (g > 100 && r > 100 && b < 43)
           frame.data[i * 4 + 3] = 0;
       }

     /*   console.log(frame.data) */
   
       this.$videoCopia.putImageData(frame, 0, 0);

       setTimeout(() => { this.atualizarFrame()}, 0)
  }
}
