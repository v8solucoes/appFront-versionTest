import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/3-interface/interface.service';

@Component({
  selector: 'app-conteudo-modulo',
  templateUrl: './conteudo-modulo.component.html',
  styleUrls: ['./conteudo-modulo.component.scss']
})
export class ConteudoModuloComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) { }

  ngOnInit() {
  }

}
