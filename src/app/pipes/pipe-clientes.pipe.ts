import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeClientes'
})
export class PipeClientesPipe implements PipeTransform {

  transform(value: any[], Busqueda: string): any {
    const resultBusqueda = [];

    for (const cliente of value ){
      if (cliente.Nombre.indexOf(Busqueda) > -1 ){
        resultBusqueda.push(cliente);
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
