import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipePuntoVenta'
})
export class PipePuntoVentaPipe implements PipeTransform {

  transform(value: any[], findProduct: string): any {
    const resultBusqueda = [];

    for (const producto of value ){
      if (producto.Nombre.indexOf(findProduct) > -1 ){
        resultBusqueda.push(producto);
      };
    };
    return resultBusqueda
 }

}
