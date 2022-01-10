import { InterfaceService } from 'src/app/3-interface/interface.service';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Animacoes } from 'src/app/3-interface/animacao';
import { GetPermissao, GetModelo } from 'src/app/2-dados/interface';
import { FormularioCRUDService } from '../formularioCRUD.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  animations: [Animacoes]
})
export class GrupoComponent {

  @Input() formulario: FormGroup;
  @Input() permissao: GetPermissao<any>;
  @Input() modelo: GetModelo<any>;

  constructor(
    public i: InterfaceService,
    public crud: FormularioCRUDService,
  ) {

  }


  getLista(form: any): FormArray { return form as FormArray; }
}
