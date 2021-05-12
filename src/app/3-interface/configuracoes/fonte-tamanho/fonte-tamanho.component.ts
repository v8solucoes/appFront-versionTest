import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../3-interface/interface.service';

@Component({
  selector: 'app-fonte-tamanho',
  templateUrl: './fonte-tamanho.component.html',
  styleUrls: ['./fonte-tamanho.component.scss']
})
export class FonteTamanhoComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) { }

  ngOnInit() {}

  adicionar(){
    let tamanho = ++this.i.data.usuario.design.temaFonte;
    document.documentElement.style.setProperty('--fonte-material', 15 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-14', 14 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-16', 16 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-20', 20 + tamanho + 'px')

  }
  diminuir(){
    let tamanho = --this.i.data.usuario.design.temaFonte;
    document.documentElement.style.setProperty('--fonte-material', 15 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-14', 14 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-16', 16 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-20', 20 + tamanho + 'px')
  }
  padrao(){
    let tamanho = 0 ;
    document.documentElement.style.setProperty('--fonte-material', 15 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-14', 14 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-16', 16 + tamanho + 'px')
    document.documentElement.style.setProperty('--fonte-20', 20 + tamanho + 'px')
    this.i.data.usuario.design.temaFonte = 0
    this.i.designUser.temaFonte = 0;
  }

}
    /*  document.documentElement.style.setProperty('--fonte', '15px') */
