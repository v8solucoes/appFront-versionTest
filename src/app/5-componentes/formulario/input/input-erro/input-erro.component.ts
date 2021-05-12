import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-erro',
  templateUrl: './input-erro.component.html',
  styleUrls: ['./input-erro.component.scss']
})
export class InputErroComponent implements OnInit {

  @Input() erros: FormGroup[];

  mensagem = {
    minlength: 'Máximo Exceddido',
    maxlength: 'Carecteres',
    actualLength: 'Atual',
    requiredLength: 'Requerido',
    required: 'Preenchimento Obrigatório',
    sincrono : 'Sincrono',
    sincPopular : 'Popular',
    teste: 'teste',
    nulo: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
