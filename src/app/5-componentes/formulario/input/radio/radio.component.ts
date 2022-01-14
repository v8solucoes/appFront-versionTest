import { ModeloCampos } from './../../../../interfaces-import';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;
  constructor() { }

  ngOnInit(): void {
  }

  clickTrue() {
    this.formulario.value
    console.log(this.formulario.value)
  }
  clickFalse() {
    !this.modelo.valor;
    console.log(!this.modelo.valor)
  }
}
