import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../interface.service';

@Component({
  selector: 'app-barra-item',
  templateUrl: './barra-item.component.html',
  styleUrls: ['./barra-item.component.scss']
})
export class BarraItemComponent implements OnInit {

  constructor(
    public i: InterfaceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  



}
