import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
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
  numero = 1
  scrollAtual: number;

  constructor() {
    /*     public router: ActivatedRoute */
    /*     this.router.params.subscribe((o) => {
    
          if (this.id != undefined) {
            this.abrirSelecaoAtual()
          }
    
        }); */
        console.log('reculculando')
        this.teste('selecionar');
  }
ngOnInit (){
  console.log('reculculando')
  this.teste('selecionar');
}
/*   ngAfterViewChecked() {

    this.teste('selecionar');
    console.log('reculculando')
  } */
  teste(quem) {
    switch (quem) {

      case 'proximo':
          this.proximo()
        break;

      case 'anterior':
        this.anterior()
        break;
      case 'selecionar':
this.abrirSelecaoAtual()
        break;

      default:
        break;
    }
  }

  proximo() {
    console.log(this.scroll.nativeElement.scrollLeft)

    this.scroll.nativeElement.scrollLeft += Math.round(this.scroll.nativeElement.scrollLeft)

    this.exibirBotao(Math.round(this.scroll.nativeElement.scrollLeft))
  }

  anterior() {

    console.log(this.scroll.nativeElement.scrollLeft)

    this.scroll.nativeElement.scrollLeft -= Math.round(this.scroll.nativeElement.offsetWidth)
    this.exibirBotao(Math.round(this.scroll.nativeElement.scrollLeft))
  }

  abrirSelecaoAtual() {

    console.log('abrir seleção')
  
    const lista = this.modelo.colecao.lista;
    this.scroll.nativeElement.scrollLeft = 0;
    lista.forEach((item, indice) => {

      if (item.id === this.formulario.get(this.id).value) {
        lista.unshift(lista[indice]);
        lista.splice(indice + 1, 1);
        /* this.scroll.nativeElement.scrollLeft = 0 */
        /*     this.scroll.nativeElement.scrollLeft = this.larguraTotal * indice; */

        /*     console.log( this.scroll.nativeElement.scrollLeft) */

        /*      this.scrollAtual = this.larguraTotal * indice */

        /*       this.scroll.nativeElement.scrollLeft = 0
      
              this.scroll.nativeElement.scrollLeft = this.larguraTotal * indice
      
              this.scrollAtual = this.larguraTotal * indice */

        /* this.exibirBotao(this.larguraTotal * indice) */

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
    const tamanhoScrooll = totalLista * imagemLargura - janelaVisivel;

    return tamanhoScrooll;
  }
  selecionar(idImagem: string,) {

    this.formulario.get(this.id).setValue(idImagem);

  }
}
