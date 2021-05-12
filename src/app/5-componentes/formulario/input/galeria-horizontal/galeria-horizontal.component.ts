import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModeloCampos } from 'src/app/2-dados/interface';
import { Animacoes } from 'src/app/3-interface/animacao';

@Component({
  selector: 'app-galeria-horizontal',
  templateUrl: './galeria-horizontal.component.html',
  styleUrls: ['./galeria-horizontal.component.scss'],
  animations: [Animacoes]
})
export class GaleriaHorizontalComponent implements OnInit {

  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;
  @Input() id: string;
  @ViewChild('scroll') scroll: ElementRef<HTMLElement>;

  largura = 200;
  altura = 200;
  borda = 2;
  margem = 16;
  larguraTotal = this.largura + this.borda + this.margem;
  cssImagem = {
    'min-width.px': this.largura,
    'height.px': this.altura,
  };
  cssAltura = {
    'height.px': this.altura
  };

  exibirProximo = false;
  exibirAnterior = false;

  constructor() {

  }
  ngOnInit() {
    this.abrirSelecaoAtual();
  }

  proximo() {
    const atual = this.scroll.nativeElement.scrollLeft += Math.round(this.scroll.nativeElement.offsetWidth);
    this.exibirBotao(atual);
  }

  anterior() {
    const atual = this.scroll.nativeElement.scrollLeft -= Math.round(this.scroll.nativeElement.offsetWidth);
    this.exibirBotao(atual);
  }

  abrirSelecaoAtual() {
    let indice = 0;
    const lista = this.modelo.colecao.lista;

    lista.forEach((item, i) => {
      if ( item.id === 'apresentador02') {
        indice = i;
        lista.unshift(this.modelo.colecao.lista[indice]);
        lista.splice(indice + 1, 1);
        return;
      }
    });

 /*    let nome = this.selecaoAtual;
    let indice: number
    this.lista.forEach((item, i) => { if (item['id'] == nome) indice = i; });
    this.scroll.nativeElement.scrollLeft += (indice) * this.larguraTotal */
  }

  exibirBotao(atual) {
    this.exibirAnterior = atual > 1 ? false : true;
    this.exibirProximo = atual < this.calcular() ? false : true;
  }

  calcular() {

    const totalLista = this.modelo.colecao.lista.length;
    const imagemLargura = this.larguraTotal;
    const janelaVisivel = Math.round(this.scroll.nativeElement.offsetWidth);
    const tamanhoScrooll = totalLista * imagemLargura - janelaVisivel;

    return tamanhoScrooll;
  }
  selecionar(indice: string) {
    this.formulario.get(this.id).setValue(indice);
  }
}
