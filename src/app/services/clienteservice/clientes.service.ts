import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../../interfaces/clientes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient) { }
  url = environment.url;

  getCliente(){
    return this.http.get<Cliente>(this.url +'cliente/clientes')
    .pipe(map((data: Cliente) => {
      //console.log(data)
      return data;
    }));
    
  }

  PostCliente(cliente: any){
    console.log(cliente);
    return this.http.post<any>(this.url + 'cliente/add', cliente, {observe: "response"});
  }

  public eliminarCliente(id: any){
    return this.http.delete<boolean>(this.url + 'cliente/delete/' + id, {observe: 'response'});
    
  }
  public putCliente(_id: String, cliente: any){
    return this.http.post<any>(this.url + 'cliente/update/'+ _id, cliente, {observe: 'response'});
    
  }

}
