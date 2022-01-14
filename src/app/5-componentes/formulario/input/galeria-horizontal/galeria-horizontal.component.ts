import { Component, ElementRef, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModeloCampos } from './../../../../interfaces-import';
import { Animacoes } from 'src/app/3-interface/animacao';

@Component({
  selector: 'app-galeria-horizontal',
  templateUrl: './galeria-horizontal.component.html',
  styleUrls: ['./galeria-horizontal.component.scss'],
  animations: [Animacoes]
})
export class GaleriaHorizontalComponent implements OnChanges, OnInit {

  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;
  @Input() id: string;
  @ViewChild('scroll') scroll: ElementRef<HTMLElement>;

  iniciou = true;

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

    setTimeout(() => {
      this.iniciou ? this.abrirSelecaoAtual() : '';
      this.iniciou = false;
    }, 500);
    
  }
  
  ngOnChanges() {

    this.iniciou ? '' : this.abrirSelecaoAtual();

  }

  proximo() {
    const atual = this.scroll.nativeElement.scrollLeft += Math.round(this.scroll.nativeElement.offsetWidth);

    this.exibirBotao(atual);
  }

  anterior() {
    const atual = this.scroll.nativeElement.scrollLeft -= Math.round(this.scroll.nativeElement.offsetWidth);

    this.exibirBotao(atual);
  }

  selecionar(idImagem: string) {

    this.formulario.get(this.id).setValue(idImagem);

  }

  abrirSelecaoAtual() {

    console.log('abrir seleção')
  
    const lista = this.modelo.colecao.lista;
    this.scroll.nativeElement.scrollLeft = 0;
    lista.forEach((item, indice) => {
      this.scroll.nativeElement.scrollLeft = 0
      if (item.id === this.formulario.get(this.id).value) {

        lista.unshift(lista[indice]);
        lista.splice(indice + 1, 1);
        this.exibirBotao(0);

        return;

      }

    });
  }

  exibirBotao(atual) {
    this.exibirAnterior = atual > 1 ? false : true;
    this.exibirProximo = atual < this.calcular() ? false : true;
  }
  calcular() {

    const totalLista = this.modelo.colecao.lista.length;
    const imagemLargura = this.larguraTotal;
    const janelaVisivel = Math.round(this.scroll.nativeElement.offsetWidth);
    const tamanhoScroll = totalLista * imagemLargura - janelaVisivel;

    return tamanhoScroll;
  }

}
