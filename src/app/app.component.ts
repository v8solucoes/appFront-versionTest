import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Debug } from './5-componentes/debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  debug = (pro: any, valor: any) => new Debug('ativo', 'Component', pro, valor);

  constructor(
    public router: ActivatedRoute,
  ) {

  }

  ngOnInit() {
  }
}
