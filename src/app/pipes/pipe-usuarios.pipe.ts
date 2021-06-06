import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Pipe({
  name: 'pipeUsuarios'
})
export class PipeUsuariosPipe implements PipeTransform {

  transform(value: any[], Busqueda: string): any {
    const resultBusqueda = [];

    for (const usuario of value ){
      if (usuario.nombre.indexOf(Busqueda) > -1 ){
        resultBusqueda.push(usuario);
      };
    };
    return resultBusqueda
 }

}
