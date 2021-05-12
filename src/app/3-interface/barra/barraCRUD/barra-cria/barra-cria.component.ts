import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/3-interface/interface.service';

@Component({
  selector: 'app-barra-cria',
  templateUrl: './barra-cria.component.html',
  styleUrls: ['./barra-cria.component.scss']
})
export class BarraCriaComponent implements OnInit {

  constructor(
    public i: InterfaceService,
  ) { }

  ngOnInit() {
  }

}
