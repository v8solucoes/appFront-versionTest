import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
nome: string;
}
@Component({
  selector: 'app-caixa-dialogo',
  templateUrl: './caixa-dialogo.component.html',
  styleUrls: ['./caixa-dialogo.component.scss']
})
export class CaixaDialogoComponent {

  constructor(
    /* Manter essa ordem para abrir corretamente */
    public dialogRef: MatDialogRef<CaixaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
  ) { }

}
