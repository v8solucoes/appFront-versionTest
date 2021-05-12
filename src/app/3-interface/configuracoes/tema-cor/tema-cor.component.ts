import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../3-interface/interface.service';

@Component({
  selector: 'app-tema-cor',
  templateUrl: './tema-cor.component.html',
  styleUrls: ['./tema-cor.component.scss']
})
export class TemaCorComponent implements OnInit {

  constructor(
    public i: InterfaceService,

  ) { }

  ngOnInit() {
  }

  trocarTema(nome: 'pad-tema-black' | 'pad-tema-white' | 'cus-tema-black' | 'cus-tema-white' ) {

    document.body.classList.remove(this.i.data.usuario.design.tema); // se não remover adiciona a nova com a antiga.
    document.body.classList.add(nome);
    this.i.data.usuario.design.tema = nome;
    this.i.designUser.tema = nome;
    /*  document.documentElement.style.setProperty('--fonte', '15px') */

    /*  this.overlay.getContainerElement().classList.add("tema-black"); */
    /*     this.el.nativeElement.style.setProperty('--main-color', 'blue')
       this.el.nativeElement.style.setProperty('bloco','font-size','30px') */
  }
}
