import { ChaveModulo } from 'src/app/2-dados/interface';
import { GetModelo } from 'src/app/2-dados/interface';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DadosService } from 'src/app/2-dados/dados.service';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';
import { FormGroup } from '@angular/forms';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { CaixaDialogoService } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.service';




@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {
  ecluirSessao = true;


  permissao = this.i.data.usuario.modulo.apresentador.permissao.filter(campo => {
    if (campo.id == 'cssAlinhamento') return campo;
    if (campo.id == 'videoAlgoritimo') return campo;
    if (campo.id == 'videoWidth') return campo;
    if (campo.id == 'videoHeight') return campo;
    if (campo.id == 'videoDuplo') return campo;
    if (campo.id == 'videoPause') return campo;
    if (campo.id == 'cssBackground') return campo;
    if (campo.id == 'alinhamentoHorizontal') return campo;
    if (campo.id == 'alinhamentoVertical') return campo;
    if (campo.id == 'corTolerancia') return campo;
    if (campo.id == 'corTransparencia') return campo;
    if (campo.id == 'corReferencia') return campo;
    if (campo.id == 'corRgb') return campo;
  });


  cssPlay = {
    'visibility': 'hidden',
  };





  @Input() formulario: FormGroup;
  @Input() modelo: GetModelo<any>;
  @Input() id: string;
  @Input() modulo: ChaveModulo;
  usuario = this.i.data.usuario;


  constructor(

    public dialogRef: MatDialogRef<VisualizarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public data2: DadosService,
    public i: InterfaceService,
    public caixaDialogo: CaixaDialogoService,


  ) { }



  ngOnInit() {
  }

  excluir() {
    this.ecluirSessao = false;
  }



}
