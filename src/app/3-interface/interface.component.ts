import { Component, OnInit, ViewChild } from '@angular/core';
import { InterfaceService } from './interface.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
})

export class InterfaceComponent implements OnInit {

  @ViewChild('menuEsquerdo') menuEsquerdo: any;
  @ViewChild('menuDireito') menuDireito: any;

  debug = true;

  constructor(
    public i: InterfaceService,
    public tela: BreakpointObserver,
    public router: ActivatedRoute
  ) {

/*     this.router.params.subscribe( o =>  {
     
      this.i.startModulo(this.router.snapshot)
    } 
    ) */

    this.tela.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {

        /*      console.log(result.breakpoints) */

        this.i.design.telaCelular = result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']
        this.i.design.telaTablet =
           result.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)']
        || result.breakpoints['(min-width: 840px) and (orientation: portrait)']
        || result.breakpoints['(max-width: 959.98px) and (orientation: landscape)']
        this.i.design.telaDesktop =
             result.breakpoints['(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)']
          || result.breakpoints['(min-width: 1280px) and (orientation: landscape)']
        this.i.design.telaDesktopTablet = this.i.design.telaTablet || this.i.design.telaDesktop
      }
    });
  }

  ngOnInit() {

    this.iniciarInterface();
   
  }

  iniciarInterface() {
    this.inscricaoEventos();
    this.iniciarTema();
  }

  inscricaoEventos() {
    this.i.eventoEmitter.subscribe(evento => {

      switch (evento) {

        case 'menuEsquerdo': { this.menuEsquerdo.toggle(); break; }
        case 'menuDireito': { this.menuDireito.toggle(); break; }

        default: {
          alert('Evento de Interface não Cadastrado: ' + evento);
          console.log('Evento de Interface não Cadastrado: ' + evento);
          break;
        }
      }
    });
  }

  iniciarTema() {
    const tema = this.i.designUser.tema;
    document.body.classList.remove(tema);
    document.body.classList.add(tema);
  }
}
