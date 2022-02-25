import { Component, ElementRef, Inject, OnInit, ViewChild, Renderer2, Directive } from '@angular/core';
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
  @Directive({
    selector: ' [apresentador]'
  })


  formulario: FormGroup;
  dados = this.i.data.usuario.modulo.apresentador.form.value;
  width = this.dados.videoWidth;
  height = this.dados.videoHeight;



  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('buffer') buffer: ElementRef<HTMLCanvasElement>;
  @ViewChild('output') output: ElementRef<HTMLCanvasElement>;
  @ViewChild('apresentador') apresentador: ElementRef;



  constructor(
    public dialogRef: MatDialogRef<GerarCodigoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public i: InterfaceService,
    public caixaDialogo: CaixaDialogoService,
    private element: ElementRef,
    private render: Renderer2,

  ) { }



  ngOnInit(): void {
    this.MeuApresentadorOk({ id: 'QjvUSNgCpE9L2' });
    // this.render.setStyle(this.element.nativeElement, 'height', '50px');
    // this.render.setStyle(this.element.nativeElement, 'width', '350px');
    // this.render.setProperty(this.element.nativeElement, 'innerHTML', "<button(click)=`CriarApresentador(video)`>clique</button>");
  }




  MeuApresentadorOk(objeto) {
    console.log('chegou aqui')
    //  const id = this.i.data.usuario.credenciais.item;
    const apresentadores = {};
    //Pegar Dados
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${objeto.id}.json`, true);
    xhttp.send(null);
    xhttp.onreadystatechange = function () {

      if (xhttp.readyState === 4 && xhttp.status == 200) {

        objeto['data'] = JSON.parse(xhttp.responseText);
        apresentadores[objeto.id] = objeto; // guarda dados de todos apresentadores
        console.log(apresentadores);


      }
    }
    this.CriarApresentador(objeto)


  }

  CriarApresentador(objeto) {

    this.CriarTagsDOM(objeto)
    // this.CriarCSSestatico(objeto)
    // this.CriarCSSdinamico(objeto)
    this.PlayStart(objeto)


    return
  }

  posicaoApresentador() {
    const alinhamento = this.dados.cssAlinhamento;
    const canvaPositionDisplay = document.querySelector<HTMLElement>(".canvas");
    canvaPositionDisplay.style.zIndex = "50";
    canvaPositionDisplay.style.position = "fixed";
    canvaPositionDisplay.style.bottom = "0";

    switch (alinhamento) {
      case "right":
        canvaPositionDisplay.style.right = "0";
        break;
      case "left":
        canvaPositionDisplay.style.left = "0";
        break;
      case "middle":
        canvaPositionDisplay.style.marginLeft = "calc(100% - 65%)";
        break;
    }
  }

  CriarTagsDOM(objeto) {

    const id = objeto.id;
    const width = this.width;
    const height = this.height;
    const duplo = this.dados.videoDuplo ? 2 : 1;
    const alinhamento = this.dados.cssAlinhamento;
    const erroAlinhamento = `Erro: Você deve criar uma tag hmtl onde quer exibir o apresentador use esse código: "<div id:"MeuApresentador${id}"></div>"'`

    const html = `
    <div  class="main1">
      <div id="meuApresentador${id}" class="canvas">
      <video   id="video${id}" src="../../../../assets/midias/${id}.mp4"
        width:"${width}px" height:"${height}px" controls autoplay muted style="display: none;">
        <source src="${objeto.id}.mp4" type="video/mp4">
        Seu navegador não suporte este vídeo.
      </video>

      <canvas  id="buffer${id}" width="${width}" height="${height}" style="display: none;"></canvas>

      <canvas  class="dinamico${id} canvas1" id="output${id}" width="${width}" height=${height / duplo}" style="width: ${width}px; height: ${height / duplo}px;"></canvas>
        <br/>
      <button id="play${id}" onclick="play('${id}')" class="play"><img style="width: 100px;height: 100px;"
                    src="./button-play.png" alt="play"></button>
      <button id="pause${id}" onclick="pause('${id}')" class="pause"><img src="./pause.png" alt="pause"></button>
      <button id="close${id}" onclick="circle('${id}')" class="close"><img id="imgClose${id}" src="./cancel.png" alt="close"></button>

     </div>
    </div>`

    alinhamento == "fluxo" ? '' : console.log(erroAlinhamento);
    alinhamento == "fluxo" ?
      this.element.nativeElement.insertAdjacentHTML('afterbegin', html)
      : document.body.insertAdjacentHTML('afterbegin', html);
    alinhamento == "right" || "left" || "middle" ? this.posicaoApresentador() : this.posicaoApresentador();
    alinhamento == "fluxo" ? document.getElementById("close" + id).hidden = true : document.getElementById("close" + id).hidden = true;
    if (alinhamento == "fluxo") {
      document.getElementById("imgClose" + id).remove();
    }
    if (alinhamento == "middle") {
      console.log("apresentador no centro");
    }

    return;

  }

  CriarCSSestatico(objeto) {
    return document.head.insertAdjacentHTML("beforeend", `
  <style type="text/css">

  .estatico{background:blue}

  </style>`)
  }

  CriarCSSdinamico(objeto) {

    const id = objeto.id;
    const background = objeto.data.cssBackground;
    const alinhamento = objeto.data.cssAlinhamento;

    return document.head.insertAdjacentHTML("beforeend", `
  <style type="text/css">

  </style>
`)
  }


  PlayStart(objeto) {

    const id = objeto.id;
    const pause = objeto.data.videoPause;
    const alinhamento = this.dados.cssAlinhamento;

    let player = <HTMLVideoElement>document.getElementById("video" + id);
    let mute = <HTMLVideoElement>document.getElementById("video" + id);
    let paused = <HTMLVideoElement>document.getElementById("video" + id);

    player.play();
    mute.muted = true;

    pause ? setTimeout(() => paused.pause(), 1400) : '';
    pause ? document.getElementById("pause" + id).hidden = true : '';
    alinhamento != "fluxo" ? document.getElementById("pause" + id).hidden = true : "";


    this.removerBackground();

  }































  play() {
    this.video.nativeElement.play();
    this.removerBackground();
  }


  removerBackground() {

    const videoAlgoritimo = this.dados.videoAlgoritimo;
    const video = this.video.nativeElement;
    const width = this.width;
    const height = this.height;
    const buffer = this.buffer.nativeElement.getContext('2d');
    const output = this.output.nativeElement.getContext('2d');
    console.log(buffer)

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
