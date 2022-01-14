import { DadosService } from 'src/app/2-dados/dados.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModeloCampos } from './../../../interfaces-import';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],

})
export class InputComponent implements OnInit {
  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;
  constructor(

    public dados: DadosService

  ) { }

  ngOnInit() {


  }
  ola() {
    alert('oi');
  }

}
