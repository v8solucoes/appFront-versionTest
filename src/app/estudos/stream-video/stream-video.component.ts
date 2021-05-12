import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as videoMerge from 'video-stream-merger';
@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.scss']
})
export class StreamVideoComponent implements OnInit, AfterViewInit{

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('audio') audio: ElementRef<HTMLAudioElement>;
  @ViewChild('videoStream') videoStream: ElementRef<HTMLMediaElement>;
  @ViewChild('gravando', {static: true}) gravando: ElementRef<HTMLMediaElement>;
  @ViewChild('download') download: any
  
/*   stream: MediaStream */
/*   videoCopia: ElementRef<HTMLCanvasElement>; */
  /* $videoCopia: CanvasRenderingContext2D; */
  gravarVideo: MediaRecorder;

  status: string
  
  ngOnInit() {}

  ngAfterViewInit(): void {
/* 
    this.audio.nativeElement.play()
    this.video.nativeElement.play(); */

    console.log(this.video.nativeElement.id)
    console.log(this.audio.nativeElement)
    
  }

  play2(){

    let merger = new videoMerge()
    let count = 1

      merger.addMediaElement('aac', this.audio.nativeElement)
      merger.addMediaElement('mp4', this.video.nativeElement, {
        mute: true,
        draw: function (ctx, frame, done) {
          count++
       /*    ctx.drawImage(frame, 360 / 2 - count / 2, 360 / 2 - count / 2, count, count) */
          ctx.drawImage(frame, 0, 0, 300, 192)
          done()
        }
      })

      merger.start()
   
      this.videoStream.nativeElement.srcObject = merger.result
      this.videoStream.nativeElement.autoplay = true 

      this.iniciarGravacao(merger.result, 2000)
  }

  play(){
    this.video.nativeElement.play();
    this.audio.nativeElement.play();
    
   // Cria um MediaElementAudioSourceNode
  let videoCtx = new AudioContext();
  let audioCtx = new AudioContext();
    
  // Feed the HTMLMediaElement into it
  let sourceVideo = videoCtx.createMediaElementSource(this.audio.nativeElement);
  let source = audioCtx.createMediaElementSource(this.audio.nativeElement);

  // Create a gain node
  let videoGainNode = videoCtx.createGain();
  videoGainNode.gain.value = 5;
  // Create a gain node
  let gainNode = audioCtx.createGain();
  gainNode.gain.value = 2;

    // connect the AudioBufferSourceNode to the gainNode
  // and the gainNode to the destination, so we can play the
  // music and adjust the volume using the mouse cursor
  source.connect(videoGainNode);
  gainNode.connect(videoCtx.destination);
}
iniciarGravacao(stream, tempo) {
    
/*   console.log(this.audio)
  this.videoStream.nativeElement.muted = false */

  this.gravarVideo = new MediaRecorder(stream,{
    audioBitsPerSecond : 128000,
    videoBitsPerSecond : 2500000,
    mimeType : 'video/webm'
  }) ;
  let disco = [];
 
  this.gravarVideo .ondataavailable = event => disco.push(event.data);
  this.gravarVideo .start();
  
  this.status = this.gravarVideo .state + " por " + (tempo/2000) + " segundos...";
 
  let stopped = new Promise((resolve, reject) => {
    this.gravarVideo.onstop = resolve;
    this.gravarVideo.onerror = event => reject(event['name']);
  });

  let recorded = this.contarTempo(tempo).then(
    () => this.gravarVideo.state == "recording" && this.gravarVideo.stop()
  );
 
  return Promise.all([
    stopped,
    recorded
  ])
  .then(() => disco).then (discoGravado => {
/* this.gravarVideo.stop() */
   /*  this.gravando.nativeElement.srcObject = this.gravarVideo.stream
    this.gravando.nativeElement.play()

    console.log(this.gravando.nativeElement) */

    let gravarBlob = new Blob(discoGravado, { type: "video/webm" });
    this.gravando.nativeElement.src = URL.createObjectURL(gravarBlob);
    this.download.nativeElement.href = this.gravando.nativeElement.src;
    this.download.nativeElement.download = "VideoGravado.webm";
    
    this.status = "Gravado com Sucesso" + gravarBlob.size + " bytes of " +
    gravarBlob.type + " media.";
    console.log(gravarBlob)
    console.log(tempo)
  })
  .catch(log => { console.log(log + tempo); this.status = log });
}

contarTempo(tempo) {
  console.log('TEMPO')
  return new Promise(resolve => setTimeout(resolve, tempo));
}
}
 // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame