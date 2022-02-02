import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  dados = this.i.data.usuario.modulo.apresentador.form.value;
  width = this.dados.videoWidth;
  height = this.dados.videoHeight;

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('buffer') buffer: ElementRef<HTMLCanvasElement>;
  @ViewChild('output') output: ElementRef<HTMLCanvasElement>;

  constructor(
    public dialogRef: MatDialogRef<GerarCodigoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public i: InterfaceService,
    public caixaDialogo: CaixaDialogoService,

  ) { }

  ngOnInit(): void {
  }

  play() {
    this.video.nativeElement.play();
    this.removerBackground();
  }


  removerBackground() {

    const id = this.i.data.usuario.credenciais.item;


    const videoAlgoritimo = this.dados.videoAlgoritimo;
    const video = this.video.nativeElement;
    const width = this.width;
    const height = this.height;
    const buffer = this.buffer.nativeElement.getContext('2d');
    const output = this.output.nativeElement.getContext('2d');


    buffer.drawImage(video, 0, 0, width, height);

    switch (videoAlgoritimo) {

      case "duplo": this.videoDuplo(buffer, output, width, height); break;
      case "unico": this.videoUnico(buffer, output, width, height); break;

      default: console.log('algorítimo não encontrado'); break;
    }

    if (video.paused || video.ended) return;

    // return setTimeout(() => this.removerBackground(), 0);
    requestAnimationFrame(() => this.removerBackground());
  }

  videoDuplo(buffer, output, width, height) {
    const duplo = 2;
    let mascara = buffer.getImageData(0, height / duplo, width, height / duplo);
    let imagem = buffer.getImageData(0, 0, width, height / duplo);

    for (let i = 3; i < mascara.data.length; i += 4) {
      imagem.data[i] = mascara.data[i - 1];
    }
    output.putImageData(imagem, 0, -2);
    return;
  }

  videoUnico(buffer, output, width, height) {

    const duplo = 1;
    const corTolerancia = this.dados.corTolerancia;
    const corReferencia = this.dados.corReferencia;
    const corTransparencia = this.dados.corTransparencia;

    let mascara = buffer.getImageData(0, height / duplo, width, height / duplo);
    let imagem = buffer.getImageData(0, 0, width, height / duplo);


    let frameTamanho = mascara.data.length / 4;

    for (let i = 0; i < frameTamanho; i++) {

      let r = mascara.data[i * 4 + 0];
      let g = mascara.data[i * 4 + 1];
      let b = mascara.data[i * 4 + 2];
      const cor = { r, g, b };

      if (this.distancia(cor, corReferencia) > corTolerancia) {
        imagem.data[i * 4 + 3] = corTransparencia;
      }
    }
    output.putImageData(imagem, 0, 0);

    return;
  }

  distancia(color, referencia) {
    const diferenca = { r: referencia.r - color.r, g: referencia.g - color.g, b: referencia.b - color.b };
    const modulo = Math.sqrt((diferenca.r * diferenca.r) + (diferenca.g * diferenca.g) + (diferenca.b * diferenca.b));
    return modulo;
  }





  //  pause(id) {
  //   document.getElementById("video" + id).pause();
  //   document.getElementById("play" + id).hidden = false;
  //   document.getElementById("pause" + id).hidden = true;
  // }




  pause() {
    this.video.nativeElement.pause();
  }

  excluir() {
    this.ecluirSessao = false;
  }

  // removerFundoRGB() {
  //   this.video.nativeElement.play();
  //   /*   this.cssPlay = {
  //       'visibility': 'hidden',
  //     }; */

  //   const video = this.video.nativeElement
  //   const width = video.videoWidth;
  //   const height = video.videoHeight;
  //   const processando = this.processando.nativeElement.getContext('2d')
  //   const exibir = this.exibir.nativeElement.getContext('2d')

  //   processando.drawImage(video, 0, 0, width, height); // Copia Imagem vídeo

  //   let frame = processando.getImageData(0, 0, width, height);
  //   let frameTamanho = frame.data.length / 4;

  //   for (let i = 0; i < frameTamanho; i++) {
  //     let r = frame.data[i * 4 + 0];
  //     let g = frame.data[i * 4 + 1];
  //     let b = frame.data[i * 4 + 2];
  //     if (g > 100 && r > 100 && b < 43) {
  //       frame.data[i * 4 + 3] = 0;
  //     }

  //   }

  //   exibir.putImageData(frame, 0, 0);

  //   if (video.paused || video.ended) return;

  //   setTimeout(() => this.removerFundoRGB(), 0);

  // }

}
