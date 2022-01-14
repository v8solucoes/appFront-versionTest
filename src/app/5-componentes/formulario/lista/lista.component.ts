import { Component, Input, OnInit} from '@angular/core';
import { FormArray } from '@angular/forms';

import { Animacoes } from 'src/app/3-interface/animacao';
import { ModeloCampos } from './../../../interfaces-import';
import { FormularioCRUDService } from '../formularioCRUD.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  animations: [Animacoes]
})
export class ListaComponent implements OnInit {

  @Input() formulario: FormArray;
  @Input() modelo: ModeloCampos;

  abrir = false;

  constructor(

    public crud: FormularioCRUDService,

  ) { }

  ngOnInit() {

    this.abrir = this.modelo.abrirGrupo;

  }
  getLista(form: any): FormArray { return form as FormArray; }
}
