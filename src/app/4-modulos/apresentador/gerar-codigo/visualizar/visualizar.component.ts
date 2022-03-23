import { ChaveModulo } from 'src/app/2-dados/interface';
import { GetModelo } from 'src/app/2-dados/interface';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DadosService } from 'src/app/2-dados/dados.service';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';
import { FormGroup } from '@angular/forms';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';




@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {
  ecluirSessao = true;
  formulario: FormGroup;
  id = 'QjvUSNgCpE9L2';
  dados = this.i.data.usuario.modulo.apresentador.form.value;
  width = 230;
  height = 365;
  // width = this.dados.videoWidth;
  // height = this.dados.videoHeight;
  duplo = this.dados.videoDuplo ? 2 : 1;


  permissao = this.i.data.usuario.modulo.apresentador.permissao.filter(campo => {
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


  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('buffer') buffer: ElementRef<HTMLCanvasElement>;
  @ViewChild('output') output: ElementRef<HTMLCanvasElement>;
  @ViewChild('apresentador') apresentador: ElementRef<HTMLCanvasElement>;


  // @Input() formulario: FormGroup;
  @Input() modelo: GetModelo<any>;
  // @Input() id: string;
  @Input() modulo: ChaveModulo;
  usuario = this.i.data.usuario;


  constructor(

    public dialogRef: MatDialogRef<VisualizarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public data2: DadosService,
    public i: InterfaceService,
    public caixaDialogo: CaixaDialogoService,


  ) { }



  ngOnInit() {
  }

  ngAfterViewInit() {
    this.PlayStart();
  }

  cancel() {
    this.ecluirSessao = false;
  }



  MeuApresentadorOk(objeto) {
    const apresentadores = {};
    //Pegar Dados
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `../../../../../QjvUSNgCpE9L2.json`, true);
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
    // this.CriarTagsDOM(objeto)
    // this.CriarCSSestatico(objeto)
    // this.CriarCSSdinamico(objeto)
    // this.PlayStart(objeto)
    return
  }

  //------------------- Essa função está sendo usada no criar-form.ts------------------------
  posicaoApresentador() {
    const alinhamento = this.dados.cssAlinhamento;
    const canvaPositionDisplay = document.querySelector<HTMLElement>(".canvas");
    canvaPositionDisplay.style.position = "absolute";
    canvaPositionDisplay.style.bottom = "0";

    switch (alinhamento) {
      case "right":
        canvaPositionDisplay.style.right = "0";
        canvaPositionDisplay.style.left = "";
        break;
      case "left":
        canvaPositionDisplay.style.left = "0";
        canvaPositionDisplay.style.right = "";
        break;
      case "middle":
        canvaPositionDisplay.style.left = "calc(52% - 121px)";
        canvaPositionDisplay.style.right = "";
        break;
    }
  }

  //-----------------  Tags já estão no arquivo visualizar.component.html--------------------
  // CriarTagsDOM(objeto) {
  //   const id = objeto.id;
  //   const width = this.width;
  //   const height = this.height;
  //   const duplo = this.dados.videoDuplo ? 2 : 1;
  //   const alinhamento = this.dados.cssAlinhamento;
  //   const erroAlinhamento = `Erro: Você deve criar uma tag hmtl onde quer exibir o apresentador use esse código: "<div id:"MeuApresentador${id}"></div>"'`

  //   const html = `
  //   <div  class="main1">
  //     <div id="meuApresentador${id}" class="canvas">
  //     <video #video  id="video${id}" "
  //       width:"${width}px" height:"${height}px" controls autoplay muted style="display: none;">
  //       <source src="../../../../assets/midias/${id}.mp4" type="video/mp4">
  //       Seu navegador não suporte este vídeo.
  //     </video>

  //     <canvas #buffer  id="buffer${id}" width="${width}" height="${height}" style="display: none;"></canvas>

  //     <canvas #output  class="dinamico${id} canvas1" id="output${id}" width="${width}" height=${height / duplo}" style="width: ${width}px; height: ${height / duplo}px;"></canvas>
  //       <br/>
  //     <button id="play${id}" (click)="play('${id}')" class="play"><img style="width: 100px;height: 100px;"
  //                   src="../../../../assets/midias/button-play.png" alt="play"></button>
  //     <button id="pause${id}" onclick="pause('${id}')" class="pause"><img src="./pause.png" alt="pause"></button>
  //     <button id="close${id}" onclick="circle('${id}')" class="close"><img id="imgClose${id}" src="./cancel.png" alt="close"></button>

  //    </div>
  //   </div>`

  //   alinhamento == "fluxo" ? '' : console.log(erroAlinhamento);
  //   alinhamento == "fluxo" ?
  //     this.element.nativeElement.insertAdjacentHTML('afterbegin', html)
  //     : document.body.insertAdjacentHTML('afterbegin', html);

  //   alinhamento == "right" || "left" || "middle" ? this.posicaoApresentador() : this.posicaoApresentador();
  //   alinhamento == "fluxo" ? document.getElementById("close").hidden = true : document.getElementById("close").hidden = true;
  //   if (alinhamento == "fluxo") {
  //     document.getElementById("imgClose").remove();
  //   }
  //   if (alinhamento == "middle") {
  //     console.log("apresentador no centro");
  //   }

  //   return;

  // }


  //------------------ Funções de css estatico e dinamico não estão em uso--------------------
  //   CriarCSSestatico(objeto) {
  //     return document.head.insertAdjacentHTML("beforeend", `
  //   <style type="text/css">
  //   .estatico{background:blue}
  //   </style>`)
  //   }

  //   CriarCSSdinamico(objeto) {
  //     const id = objeto.id;
  //     const background = objeto.data.cssBackground;
  //     const alinhamento = objeto.data.cssAlinhamento;
  //     return document.head.insertAdjacentHTML("beforeend", `
  //   <style type="text/css">
  //   </style>
  // `)
  //   }


  PlayStart() {
    // const id = objeto.id;
    const pause = this.dados.videoPause;
    const alinhamento = this.dados.cssAlinhamento;
    let player = <HTMLVideoElement>document.getElementById("video");
    let mute = <HTMLVideoElement>document.getElementById("video");
    let paused = <HTMLVideoElement>document.getElementById("video");

    player.play();
    mute.muted = true;

    pause ? setTimeout(() => paused.pause(), 1400) : '';
    pause ? document.getElementById("pause").hidden = true : '';
    alinhamento != "fluxo" ? document.getElementById("pause").hidden = true : "";
    alinhamento != "fluxo" ? document.getElementById("close").hidden = true : "";

    this.removerBackground();
  }

  play() {
    const video = <HTMLVideoElement>document.getElementById("video");

    video.currentTime = 0;
    video.muted = false;
    video.play();
    document.getElementById("play").hidden = true;
    document.getElementById("pause").hidden = false;
    document.getElementById("close").hidden = false;
    this.removerBackground();
  }
  hover() {
    const hover = <HTMLVideoElement>document.getElementById("meuApresentador");
    hover.addEventListener('mouseover', function () {
      document.getElementById("close").hidden = false;
      document.getElementById("pause").hidden = false;
    });

    hover.addEventListener('mouseout', function () {
      document.getElementById("close").hidden = true;
      document.getElementById("pause").hidden = true;
    });
  }
  pause() {
    this.video.nativeElement.pause();
    document.getElementById("play").hidden = false;
    document.getElementById("pause").hidden = true;
    document.getElementById("close").hidden = false;
  }

  removerBackground() {
    const video = this.video.nativeElement;
    const videoAlgoritimo = this.dados.videoAlgoritimo;
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

    return setTimeout(() => this.removerBackground(), 0);
    // requestAnimationFrame(() => this.removerBackground());
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




  circle() {
    document.getElementById('play').hidden = true;
    document.getElementById('pause').hidden = true;
    document.getElementById('video').hidden = true;
    document.getElementById('close').hidden = true;
    document.querySelector<HTMLElement>('.canvas1').hidden = true;

    let floatCircle = document.querySelector<HTMLElement>('.canvas');
    floatCircle.style.position = "absolute";
    floatCircle.style.width = "100px";
    floatCircle.style.height = "100px";
    floatCircle.style.bottom = "0";
    floatCircle.style.right = "0";


    if (document.querySelector<HTMLElement>('.voltar') && document.querySelector<HTMLElement>('.imgFloat')) {
      document.getElementById('aumentar').hidden = false;
      document.querySelector<HTMLElement>('.imgFloat').hidden = false;
    } else {
      this.criaBotao();
      this.criaImagen();
      this.imgFloat();
      this.pause();
      document.getElementById('play').hidden = true;
      document.querySelector<HTMLElement>(".canvas").hidden = true;
    }
  }



  imgFloat() {
    let image = document.createElement('img');
    image.src = "../../../../../assets/midias/poster.png";
    document.querySelector(".canvas").appendChild(image);
    image.style.borderRadius = "100%";
    image.style.width = "80px";
    image.style.height = "80px";
    image.style.backgroundSize = "contain";
    image.style.boxShadow = "0px 0px 5px #000000"

    let att = document.createAttribute("class");
    att.value = "imgFloat";
    image.setAttributeNode(att);
  }


  criaBotao() {
    let voltar = document.querySelector<HTMLElement>('.voltar');
    voltar.style.position = "absolute";
    voltar.style.top = "0%";
    voltar.style.left = "55%";
    voltar.style.zIndex = "550";
    voltar.style.width = "30px";
    voltar.style.height = "30px";
    voltar.style.borderRadius = "50%";
    voltar.style.border = "none";
    voltar.style.background = "none";
  }

  criaImagen() {

    let image = document.createElement('img');
    image.src = "../../../../../assets/resize.png";
    document.querySelector('.voltar').appendChild(image);
    image.style.marginLeft = "5%";
    image.style.marginTop = "-5px";
    image.style.width = "40px";
    image.style.height = "40px";
    image.style.cursor = 'pointer';

    let imgClass = document.createAttribute("class");
    imgClass.value = "onResize";
    image.setAttributeNode(imgClass);
  }

  ampliar() {

    document.querySelector<HTMLElement>('.canvas1').hidden = false;
    document.querySelector<HTMLElement>('.imgFloat').hidden = true;
    document.getElementById('play').hidden = false;
    document.getElementById('aumentar').hidden = true;

    let floatCircle = document.querySelector<HTMLElement>(".canvas");
    floatCircle.style.width = "";
    floatCircle.style.height = "";
  }
}
