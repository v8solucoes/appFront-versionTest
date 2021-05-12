import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnimaComponent } from '../animacoes/anima-component';
import { InterfaceService } from '../interface.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  animations:[ AnimaComponent],
})
export class DesktopComponent implements OnInit, AfterViewInit {
  chaveModulo = 'revenda'
  constructor(
    public i: InterfaceService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.i.design.telaDesktopTablet = false;
    this.i.design.telaDesktopTablet = true;
  }

}
