import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuario(){
    return this.http.get<Usuario>('http://localhost:4000/usuarios');
  }

  PostUsuario(usuario: any){
    return this.http.post<any>("http://localhost:4000/nUsuario", usuario, {observe: "response"});
  }

  public deleteUsuario(id: String){
    return this.http.delete<boolean>("http://localhost:4000/usuario/" + id, {observe: 'response'});
    
  }
  public putUsuario(id: String, cliente: any){
    return this.http.put<boolean>("http://localhost:4000/usuarios/" + id, cliente, {observe: 'response'});
    
  }


}
