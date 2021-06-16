import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeCreditos'
})
export class PipeCreditoPipe implements PipeTransform {

  transform(value: any[], Busqueda: string): any {
    const resultBusqueda = [];

    for (const credito of value ){
      if (credito.Nombre.indexOf(Busqueda) > -1 ){
        resultBusqueda.push(credito);
      };
    };
    return resultBusqueda
    /*if(Busqueda === '' || Busqueda === undefined) {
      return value;
    }
    return value.filter(clientes => clientes.name.toLowerCase().indexOf(Busqueda) != -1)
  */
 }
}