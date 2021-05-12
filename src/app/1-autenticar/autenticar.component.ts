import { Component, OnInit } from '@angular/core';
import { AutenticarService } from './autenticar.service';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.scss']
})
export class AutenticarComponent implements OnInit {

  exibir = true;

  constructor(
    public autenticar: AutenticarService,
  )
  {
    console.log('Autenticar Component');
  }

  ngOnInit() {

  }

}
