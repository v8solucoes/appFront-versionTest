import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormsModule, FormArrayName, FormGroupName } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormularioCRUDService {

constructor(

) { }

// LISTAS
addCampoLista(formulario: FormArray) {
  formulario.push(new FormControl())
}

deleteCampoLista(formulario: FormArray, indice: number) {
  formulario.removeAt(indice)
}

limparLista(formulario: any) {
  formulario.clear()
}

// Objetos
addObjeto(formulario: any) {
/*   let modulo = this.v.usuario.modulo['cliente'].formulario,
  adicionar = modulo.splice(1,0,{"tipo":"control","id": "testeControl2"})

  let objetoNome = prompt('Digite o NOME de um objeto testeControl2')
  let objetoValor = prompt('Digite o VALOR de um objeto')
  formulario.addControl(objetoNome, new FormControl(objetoValor)) */
}

addListaObjeto(form: any) {
/*   let modulo = this.v.usuario.modulo['cliente'].formulario,
  adicionar = modulo.splice(1,0,{"tipo":"control","id": "testeControl2"})
  let objetoListaNome = prompt('Digite o NOME de um objeto')
  let objetoListaValor = prompt('Digite o VALOR de um objeto')
  form.push(new FormGroup({ [objetoListaNome]: new FormControl(objetoListaValor) })) */
}

reset(formulario: any) {
  formulario.reset();
}

deleteObjeto(formulario: any, campo: any, indice:number) {
/*   let modulo = this.v.usuario.modulo['cliente'].formulario
   modulo.splice(indice--, 1)
  formulario.removeControl(campo); */
}







}
