import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.scss']
})
export class ValidarComponent implements OnInit {

  constructor(
  /* Manter essa ordem para abrir corretamente */
  public dialogRef: MatDialogRef<ValidarComponent>,
  @Inject(MAT_DIALOG_DATA)
  public data: any,

  ) { }

  ngOnInit() {
  }

}
