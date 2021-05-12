import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-gravar',
  templateUrl: './video-gravar.component.html',
  styleUrls: ['./video-gravar.component.css']
})

export class VideoGravarComponent implements OnInit {

  @ViewChild('videoOrigem', {static: true}) videoOrigem: ElementRef<HTMLMediaElement>;
  @ViewChild('gravando') gravando: any
  @ViewChild('download') download: any
  @ViewChild('audio') audio: ElementRef<HTMLMediaElement>;

  status = 'Aguardando Clique';
  gravarVideo: MediaRecorder;
  tempoGravacao = 10000;

  constructor( ) { }

  ngOnInit() {}

  gravar() {

 navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream:MediaStream)=> {
      this.audio.nativeElement.play()

      let media = this.audio.nativeElement

      console.log(media)
     /*  media = this.audio.nativeElement. */
      console.log(this.audio.nativeElement.src)
      console.log(stream)

     /*  stream.addTrack(.getTracks[0]) */

    /*   this.videoOrigem.nativeElement.src = '../../../assets/midias/video.mp4'; */
      this.videoOrigem.nativeElement.srcObject = stream;
      this.videoOrigem.nativeElement.play()
      this.videoOrigem.nativeElement.muted = true
      this.download.nativeElement.href = stream;
/*       this.download.nativeElement.href = '../../../assets/midias/video.mp4'; */
  /*     (this.videoOrigem.nativeElement as any).captureStream =  (this.videoOrigem.nativeElement as any).captureStream() || (this.videoOrigem.nativeElement as any).mozCaptureStream; */

    return new Promise(resolve => this.videoOrigem.nativeElement.onplaying = resolve);
    })
    .then ( () => this.iniciarGravacao((this.videoOrigem.nativeElement as any).captureStream(), this.tempoGravacao))
    .then (discoGravado => {
      let gravarBlob = new Blob(discoGravado, { type: "video/webm" });
      this.gravando.nativeElement.src = URL.createObjectURL(gravarBlob);
      this.download.nativeElement.href = this.gravando.nativeElement.src;
      this.download.nativeElement.download = "VideoGravado.webm";
      
      this.status = "Gravado com Sucesso" + gravarBlob.size + " bytes of " +
          gravarBlob.type + " media.";
    })
    .catch(log => { console.log(log); this.status = log });
  }
  contarTempo(tempo) {
    console.log('TEMPO')
    return new Promise(resolve => setTimeout(resolve, tempo));
  }
  stop() {

    (this.videoOrigem.nativeElement.srcObject as MediaStream).getTracks().forEach(track => track.stop());
  }

  iniciarGravacao(stream, tempo) {
    this.videoOrigem.nativeElement.muted
    let types = ["video/webm", 
             "audio/webm", 
             "video/webm\;codecs=vp8", 
             "video/webm\;codecs=daala", 
             "video/webm\;codecs=h264", 
             "audio/webm\;codecs=opus", 
             "video/mp4\;codecs=avc1.4d002a",
             "video/mp4"];

for (let i in types) { 
  console.log( "Is " + types[i] + " supported? " + (MediaRecorder.isTypeSupported(types[i]) ? "Maybe!" : "Nope :(")); 
}

    this.gravarVideo = new MediaRecorder(stream,{
      audioBitsPerSecond : 128000,
      videoBitsPerSecond : 2500000,
      mimeType : 'video/webm'
    }) ;
    let disco = [];
   
    this.gravarVideo .ondataavailable = event => disco.push(event.data);
    this.gravarVideo .start();
    
    this.status = this.gravarVideo .state + " por " + (tempo/1000) + " segundos...";
   
    let stopped = new Promise((resolve, reject) => {
      this.gravarVideo .onstop = resolve;
      this.gravarVideo .onerror = event => reject(event['name']);
    });
  
    let recorded = this.contarTempo(tempo).then(
      () => this.gravarVideo .state == "recording" && this.gravarVideo .stop()
    );
   
    return Promise.all([
      stopped,
      recorded
    ])
    .then(() => disco);
  }
}
