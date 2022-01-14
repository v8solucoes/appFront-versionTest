
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Debug } from 'src/app/5-componentes/debug';
import { GetPermissao, DadosFuncao, GetModelo, ValidarSincrono, ModeloCampos } from './../../../interfaces-import';

export class CriarForm {


  static grupo(campos: GetPermissao<any>, modelo: any, dados?: any): FormGroup {

    /*  console.log(campos);
     console.log(modelo);
     console.log(dados); */
    if (dados == undefined || null) { dados = {} }

    campos ? '' : alert('Criar Form "Campos" INDEFINIDO');
    modelo ? '' : alert('Criar Form "Modelos" INDEFINIDO');

    const grupo = {};

    campos.forEach((campo, i) => {
      const id = campo.id;
      /*   console.log(dados[id]); */
      const dado = dados[id]
        ? dados[id]
        : (modelo[id].tipo === 'lista' || modelo[id].tipo === 'grupoLista')
          ? modelo[id].valor
          : modelo[id].valor[0];

      const validarSincrono = modelo[id].validarSincrono
        ? modelo[id].validarSincrono.map(funcao => Funcao.sincrono(funcao, id, modelo[id]))
        : [];
      const validarAssincrono = modelo[id].validarAssincrono
        ? modelo[id].validarAssincrono.map(funcao => Funcao.assincrono(funcao.nome, funcao.dadosFuncao, id, modelo))
        : [];

      switch (modelo[id].tipo) {

        case 'control': grupo[id] =

          new FormControl({ value: dado, disabled: campo.editar }, validarSincrono, validarAssincrono); break;

        case 'lista': grupo[id] = new FormArray(dado.map((c, i) =>

          new FormControl({ value: dado[i], disabled: campo.editar }, validarSincrono, validarAssincrono))); break

        case 'grupo': grupo[id] =

          CriarForm.grupo(campo.grupo, modelo, dado); break

        case 'grupoLista': grupo[id] = new FormArray(dado.map((c, i) =>

          CriarForm.grupo(campo.grupo, modelo, dado[i]))); break

        default:
          console.log('Formulario Tipo: ' + modelo[id].tipo + ' Não EXISTE');
          return alert('Formulario Tipo: ' + modelo[id].tipo + ' Não EXISTE');
      }
    });

    /*  console.log('Form', new FormGroup(grupo)); */

    return new FormGroup(grupo);
  }
  debug = (pro: any, valor: any) => new Debug('ativo', 'CriarForm', pro, valor);
}

export class Funcao {

  static sincrono(dados: ValidarSincrono, id: any, modelo: any) {

    switch (dados.funcao) {
      case 'nativoRequerido': return Validators.required;
      case 'nativoRequeridoTrue': return Validators.requiredTrue;
      case 'nativoTextoMinimo': return Validators.minLength(dados.valor);
      case 'nativoTextoMaximo': return Validators.maxLength(dados.valor);
      case 'popularCampo': return Funcao.validar(Funcao.popular, dados, modelo, id);
      case 'converterRgb': return Funcao.validar(Funcao.converteRgb, dados, modelo, id);
      case 'popularColecaoObjeto': return Funcao.validar(Funcao.popularObjeto, dados, modelo, id);
      case 'popularColecaoLista': return Funcao.validar(Funcao.popularLista, dados, modelo, id);

      default: alert('Função Sincrona com o nome: >> ' + dados.funcao + ' << não existe!'); return null;
    }
  }

  static validar(funcao, dados, modelo, id) {

    dados.origem ? '' : dados.origem = [id];

    return (control: AbstractControl): ValidationErrors | null => {

      const controle = control.root as FormGroup;

      if (controle.controls && controle.get(dados.origem[0]) != null && controle.get(dados.origem[0]).pristine !== true) {

        return funcao(controle, dados, modelo);

      } else { return null }

    };
  }

  static converteRgb(controle: FormGroup, dados: ValidarSincrono, modelo: any): ValidationErrors | null {

    // Acessar Campo

    const tipo = modelo.tipo
    const corHexadecimal: RegExp = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i
    const corOrigem = controle.get(dados.origem).value


    if (corHexadecimal.test(corOrigem)) {

      const filtro = (value: String) => {
        var hex = value;
        var red = parseInt(hex[1] + hex[2], 16);
        var green = parseInt(hex[3] + hex[4], 16);
        var blue = parseInt(hex[5] + hex[6], 16);
        var corRGB = { 'r': red, 'g': green, 'b': blue }

        return JSON.stringify(corRGB);
      }
      controle.get(dados.destino).setValue(filtro(controle.get(dados.origem).value));
      return null
    } else {
      return { "corHexadecimal": { "value": controle.get(dados.origem).value } };
    }


  }



  // if (controle.get(dados.destino[0]) != null && controle.get(dados.origem[0]).pristine !== true) {

  //   dados.origem.forEach((origem, index) => {

  //     function transformColor(value: string) {
  //       var hex = value;
  //       var red = parseInt(hex[1] + hex[2], 16);
  //       var green = parseInt(hex[3] + hex[4], 16);
  //       var blue = parseInt(hex[5] + hex[6], 16);
  //       return `{r:${red},g:${green},b:${blue}}`;
  //     }
  //     controle.get(dados.destino[index]).setValue(transformColor(controle.get(origem).value));
  //   });
  // }


  static popular(controle: FormGroup, dados: ValidarSincrono) {

    if (controle.get(dados.destino[0]) != null && controle.get(dados.origem[0]).pristine !== true) {

      dados.origem.forEach((origem, index) => {

        controle.get(dados.destino[index]).setValue(controle.get(origem).value);

      });
    }
  }
  static popularControl(controle: FormGroup, dados: ValidarSincrono) {

    if (controle.get(dados.destino[0]) != null && controle.get(dados.origem[0]).pristine !== true) {

      dados.origem.forEach((origem, index) => {

        return controle.get(dados.destino[index]).setValue(controle.get(origem).value);


      });
    }
  }



  static popularObjeto(controle: FormGroup, dados: ValidarSincrono, modelo?: ModeloCampos) {

    if (controle.get(dados.destino[0]) != null && controle.get(dados.origem[0]).pristine !== true) {

      dados.destino.forEach((destino) => {
        const origem = controle.get(dados.origem[0]).value;
        const valor = modelo.colecao.objeto[origem][destino];

        controle.get(destino).setValue(valor);
      });
    }
  }
  static popularLista(controle: FormGroup, dados: ValidarSincrono, modelo?: ModeloCampos) {

    if (controle.get(dados.origem[0]) != null) {
      dados.origem.forEach((itemOrigem, indice) => {

        const origemValor = controle.get(itemOrigem).value
        const colecao = dados.colecao[indice]
        const destino = dados.destino[indice]

        modelo.colecao.lista.forEach((item) => {

          if (origemValor == item['id']) {

            controle.get(destino).setValue(item[colecao]);
            controle.get(destino).markAsDirty({ onlySelf: true })

          }
        }

        )
      });
    }
  }

  static assincrono(nome: string, dadosFuncao: DadosFuncao[], id: string, modelo: GetModelo<any>) {

    const validar = (control: FormControl): Observable<{ [s: string]: boolean }> => {

      return new Observable<{ [s: string]: boolean }>(observer => {

        if (!control.root || !(<FormGroup>control.root).controls) { return null; }

        setTimeout(() => {
          if (control.value == "teste") {
            observer.next({ "teste": true });
          } else {
            observer.next(null);
          }
          observer.complete();
        }, 2000);

      });
    };

    return validar;
  }



  /*     static testeAssincrono(control, dadosFuncao: DadosFuncao[]): Observable<{ [s: string]: boolean }> {

        return new Observable<{ [s: string]: boolean }>(observer => {
          setTimeout(() => {
            if (control == "teste") {
              observer.next({ "teste": true });
            } else {
              observer.next(null);
            }
            observer.complete();
          }, 2000);
        });
      } */

  /* criarFormulario(permissao: any, modelo: any, dados?: any): FormGroup {

    let grupo: any = {}

    permissao.forEach((campo, i) => {
      console.log(dados)
      let
        id = campo.id,
        dado = dados[id] ? dados[id] :
         (modelo[id].tipo == 'lista' || modelo[id].tipo == 'grupoLista') ? modelo[id].valor : modelo[id].valor[0],

        validarSincrono = modelo[id].validarSincrono.map(funcao => Funcao.sincrono(funcao.nome, funcao.dadosFuncao, id, modelo)),
        validarAssincrono = modelo[id].validarAssincrono.map(funcao => Funcao.assincrono(funcao.nome, funcao.dadosFuncao, id, modelo))

      switch (modelo[id].tipo) {

        case 'control': grupo[id] =

          new FormControl({ value: dado, disabled: campo.editar }, validarSincrono, validarAssincrono); break

        case 'lista': grupo[id] = new FormArray(dado.map((c, i) =>

          new FormControl({ value: dado[i], disabled: campo.editar }, validarSincrono, validarAssincrono))); break

        case 'grupo': grupo[id] =

          this.criarFormulario(campo.grupo, modelo, dado); break

        case 'grupoLista': grupo[id] = new FormArray(dado.map((c, i) =>

          this.criarFormulario(campo.grupo, modelo, dado[i]))); break

        default:
          console.log('Formulario Tipo: ' + modelo[id].tipo + ' Não EXISTE');
          return alert('Formulario Tipo: ' + modelo[id].tipo + ' Não EXISTE');
      }
    });

    return new FormGroup(grupo)
  } */
}


/* static sincrono(nome: string, dados: any, id: string, modelo: any) {

  const validar = (control: FormControl) => {

    if (!control.root || !(<FormGroup>control.root).controls) { return null; }

    setTimeout(() => {
      switch (nome) {
        case 'nativoRequerido': return Validators.required;
        case 'nativoTextoMinimo': return Validators.minLength(dados);
        case 'nativoTextoMaximo': return Validators.maxLength(dados);
        case 'popularCampos': return Funcao.popularCampos(control, dadosFuncao)
        case 'criarObjeto': return Funcao.criarObjeto(control, dadosFuncao, modelo)

        default: alert('Função Sincrona com no nome: >> ' + nome + ' << não existe!'); return null;
      }
    }, 1000);
  }; */

/*  static popularCampos(control, dadosFuncao: DadosFuncao[]) {

  dadosFuncao.forEach((campo) => (<FormGroup>control.root).get(campo.gravarEm).setValue(control.value));

} */
