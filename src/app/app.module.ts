import { DadosService } from './2-dados/dados.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';

import { AutenticarService } from 'src/app/1-autenticar/autenticar.service';
/* import { DadosService } from 'src/app/2-dados/dados.service'; */

import { AutenticarModule } from './1-autenticar/autenticar.module';
import { InterfaceModule } from './3-interface/interface.module';
import { ApresentadorModule } from './4-modulos/apresentador/apresentador.module';

import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    HttpClientModule,
    AutenticarModule,
    InterfaceModule,
    ApresentadorModule,
    MatDialogModule,
  ],

  declarations: [
    AppComponent,
  ],

  exports: [
    AppComponent
  ],

  providers: [
    AutenticarService,
    DadosService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
