import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModeloCampos } from 'src/app/2-dados/interface';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {


  @Input() formulario: FormGroup;
  @Input() modelo: ModeloCampos;

  constructor() { }

  ngOnInit(): void {
  }

}
