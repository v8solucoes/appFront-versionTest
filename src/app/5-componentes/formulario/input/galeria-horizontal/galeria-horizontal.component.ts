import { Component, ElementRef, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModeloCampos } from 'src/app/2-dados/interface';
import { Animacoes } from 'src/app/3-interface/animacao';

@Component({
  selector: 'app-galeria-horizontal',
  templateUrl: './galeria-horizontal.component.html',
  styleUrls: ['./galeria-horizontal.component.scss'],
  animations: [Animacoes]
})
export class GaleriaHorizontalComponent implements OnChanges {

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




  constructor(public router: ActivatedRoute) {
    this.router.params.subscribe((o) => {

      if (this.id != undefined) {
        this.abrirSelecaoAtual()
      }

    });
  }

  ngOnChanges() {
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

    const lista = this.modelo.colecao.lista;

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
  selecionar(idImagem: string) {

    this.formulario.get(this.id).setValue(idImagem);

  }
}
