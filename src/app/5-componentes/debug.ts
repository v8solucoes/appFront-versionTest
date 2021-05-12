export class Debug  {

    constructor(ativo: 'ativo' | 'desativado', nome, propriedade, valor) {
        
         if(ativo == 'ativo'){
            console.group(nome + ': ' + propriedade)
            console.log(valor)
            console.groupEnd()
         }
      }
}
