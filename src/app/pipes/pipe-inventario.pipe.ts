import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeInventario'
})
export class PipeInventarioPipe implements PipeTransform {

  transform(value: any[], Busqueda: string): any {
    const resultBusqueda = [];

    for (const producto of value ){
      if (producto.Nombre.indexOf(Busqueda) > -1 ){
        resultBusqueda.push(producto);
      };
    };
    return resultBusqueda
}

}
