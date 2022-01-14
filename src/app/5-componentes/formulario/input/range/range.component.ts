import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModeloCampos } from './../../../../interfaces-import';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
 @Input() formulario: FormGroup;
 @Input() modelo: ModeloCampos;
  constructor() { }

  ngOnInit(): void {
  }

}
