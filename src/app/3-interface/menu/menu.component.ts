import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../3-interface/interface.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public i: InterfaceService
  ) {

  }

  ngOnInit() {
  }

}
