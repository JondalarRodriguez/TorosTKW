import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeInventario'
})
export class PipeInventarioPipe implements PipeTransform {

  transform(value: any[], Busqueda: string): any {
    const resultBusqueda = [];

    for (const cliente of value ){
      if (cliente.Nombre.indexOf(Busqueda) > -1 ){
        resultBusqueda.push(cliente);
      };
    };
    return resultBusqueda
  }

}
