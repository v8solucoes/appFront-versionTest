import { Modelo } from './../../2-dados/interface';
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { VisualizarComponent } from 'src/app/4-modulos/apresentador/visualizar/visualizar.component';
import { ValidarComponent } from '../formulario/validar/validar.component';
import { CaixaDialogoComponent } from './caixa-dialogo.component';
import { GerarCodigoComponent } from 'src/app/4-modulos/apresentador/gerar-codigo/gerar-codigo.component';

@Injectable({
  providedIn: 'root'
})
export class CaixaDialogoService {

  constructor(
    public dialogo: MatDialog,
  ) { }

  validar(tamanho: string, campos: string[], modelo: any): void {

    const dialogRef = this.dialogo.open(ValidarComponent, {
      width: tamanho,
      disableClose: true,
      data: {
        campos,
        modelo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*  console.log('The dialog was closed'); */
    });
  }
  abrirCaixa(tamanho: string, nome: string): void {

    const dialogRef = this.dialogo.open(CaixaDialogoComponent, {
      width: tamanho,
      disableClose: true,
      data: {
        nome: nome,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*  console.log('The dialog was closed'); */
    });
  }
  apresentador(tamanho: string, nome: string): void {

    const dialogRef = this.dialogo.open(VisualizarComponent, {
      width: tamanho,
      disableClose: true,
      data: {
        nome: nome,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*  console.log('The dialog was closed'); */
    });
  }
  codigo(tamanho: string, nome: string): void {

    const dialogRef = this.dialogo.open(GerarCodigoComponent, {
      width: tamanho,
      disableClose: true,
      data: {
        nome: nome,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*  console.log('The dialog was closed'); */
    });
  }
}
