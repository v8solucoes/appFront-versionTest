import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apresentador } from 'src/app/2-dados/interface';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';
import { GerarCodigoComponent } from '../gerar-codigo/gerar-codigo.component';

@Component({
  selector: 'app-visualizar-video',
  templateUrl: './visualizar-video.component.html',
  styleUrls: ['./visualizar-video.component.scss']
})
export class VisualizarVideoComponent implements OnInit {

  ecluirSessao = true;
  formulario: FormGroup;
  dados: Apresentador;



  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('processando') processando: ElementRef<HTMLCanvasElement>;
  @ViewChild('exibir') exibir: ElementRef<HTMLCanvasElement>;

  constructor(
    public dialogRef: MatDialogRef<GerarCodigoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public i: InterfaceService,
    public caixaDialogo: CaixaDialogoService,

  ) { }

  ngOnInit(): void {
  }

  pause() {
    this.video.nativeElement.pause();

  }

  excluir() {
    this.ecluirSessao = false;
  }

  removerFundoRGB() {
    this.video.nativeElement.play();
    /*   this.cssPlay = {
        'visibility': 'hidden',
      }; */

    const video = this.video.nativeElement
    const width = video.videoWidth;
    const height = video.videoHeight;
    const processando = this.processando.nativeElement.getContext('2d')
    const exibir = this.exibir.nativeElement.getContext('2d')

    processando.drawImage(video, 0, 0, width, height); // Copia Imagem vídeo

    let frame = processando.getImageData(0, 0, width, height);
    let frameTamanho = frame.data.length / 4;

    for (let i = 0; i < frameTamanho; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43) {
        frame.data[i * 4 + 3] = 0;
      }

    }

    exibir.putImageData(frame, 0, 0);

    if (video.paused || video.ended) return;

    setTimeout(() => this.removerFundoRGB(), 0);

  }

}
