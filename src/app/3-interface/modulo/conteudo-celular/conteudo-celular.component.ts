import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/3-interface/interface.service';

@Component({
  selector: 'app-conteudo-celular',
  templateUrl: './conteudo-celular.component.html',
  styleUrls: ['./conteudo-celular.component.scss']
})
export class ConteudoCelularComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) {
   }

  ngOnInit(


  ) {
  }

}
