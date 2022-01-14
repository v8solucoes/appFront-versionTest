import { ModeloCampos } from './../../../../interfaces-import';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss']
})
export class ColorInputComponent implements OnInit {

  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;
  constructor() { }

  ngOnInit(): void {
    console.log()
  }

}
