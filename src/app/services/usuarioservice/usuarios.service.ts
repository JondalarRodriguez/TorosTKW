import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UsuarioI } from '../../interfaces/usuarios.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  url = 'http://18.119.49.67:3000/';
  header = sessionStorage.getItem('sesion');
  opciones = {
    headers: new HttpHeaders({
      'miToken': this.header!
    })
  };

  getUsuario() {
    return this.http.get<UsuarioI>(this.url + 'user/users', this.opciones)
      .pipe(map((data: UsuarioI) => {
        return data;
      }));
  }

  PostUsuario(usuario: UsuarioI) {
    return this.http.post<any>(this.url + 'user/create', usuario, this.opciones);
  }

  public deleteUsuario(id: String){
  return this.http.delete<boolean>(this.url + 'user/delete/' + id, this.opciones);

}
  public putUsuario(id: String, cliente: UsuarioI){
  return this.http.post<any>(this.url + 'user/update/' + id, cliente, this.opciones);

}


}
