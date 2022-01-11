import { ChaveModulo } from 'src/app/2-dados/interface';
import { GetModelo } from './../../../2-dados/interface';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DadosService } from 'src/app/2-dados/dados.service';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';
import { FormGroup } from '@angular/forms';
import { InterfaceService } from 'src/app/3-interface/interface.service';




@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('processando') processando: ElementRef<HTMLCanvasElement>;
  @ViewChild('exibir') exibir: ElementRef<HTMLCanvasElement>;

  permissao = this.i.data.usuario.modulo.apresentador.permissao.filter(campo => {
    if (campo.id == 'apresentadorGaleria') return campo;
    if (campo.id == 'cssAlinhamento') return campo;
    if (campo.id == 'videoAlgoritimo') return campo;
    if (campo.id == 'videoWidth') return campo;
    if (campo.id == 'videoHeight') return campo;
    if (campo.id == 'videoDuplo') return campo;
    if (campo.id == 'videoPause') return campo;
    if (campo.id == 'cssBackground') return campo;
    if (campo.id == 'alinhamentoHorizontal') return campo;
    if (campo.id == 'alinhamentoVertical') return campo;
    if (campo.id == 'corTolerancia') return campo;
    if (campo.id == 'corTransparencia') return campo;
    if (campo.id == 'corReferencia') return campo;
    if (campo.id == 'corRgb') return campo;
  });


  cssPlay = {
    'visibility': 'hidden',
  };
  ecluirSessao = true;




  @Input() formulario: FormGroup;
  @Input() modelo: GetModelo<any>;
  @Input() id: string;
  @Input() modulo: ChaveModulo;
  usuario = this.i.data.usuario;


  constructor(

    public dialogRef: MatDialogRef<VisualizarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public data2: DadosService,
    public i: InterfaceService,

  ) { }



  ngOnInit() {
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
