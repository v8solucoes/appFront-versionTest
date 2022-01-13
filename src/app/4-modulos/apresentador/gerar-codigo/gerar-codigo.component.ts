import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterfaceService } from 'src/app/3-interface/interface.service';
import { DialogData } from 'src/app/5-componentes/caixa-dialogo/caixa-dialogo.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public i: InterfaceService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  script = `
        <script>
          src="https://sitecloudcentral.com/js/vp_player.min.js?v=1.1.29"
          data-cfasync="false">
        </script>
        <script>
          var vpPlayer = new VpPlayer embedId: '${this.i.data.usuario.credenciais.item}';
        </script>
    `;

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.openSnackBar('Copiado', 'X')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
