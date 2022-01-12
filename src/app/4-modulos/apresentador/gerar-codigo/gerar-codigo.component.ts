import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';

@Component({
  selector: 'app-gerar-codigo',
  templateUrl: './gerar-codigo.component.html',
  styleUrls: ['./gerar-codigo.component.scss']
})
export class GerarCodigoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GerarCodigoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

}
