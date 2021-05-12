import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../interface.service';

@Component({
  selector: 'app-barra-lista',
  templateUrl: './barra-lista.component.html',
  styleUrls: ['./barra-lista.component.scss']
})
export class BarraListaComponent implements OnInit {

  constructor(
    public i: InterfaceService,
  ) { }
  ngOnInit() {

  }

}
