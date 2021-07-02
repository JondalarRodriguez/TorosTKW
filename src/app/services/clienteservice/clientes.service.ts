import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  url = 'http://3.18.46.141:3000/';

  header = sessionStorage.getItem('sesion');
  encabezado = {
    headers: new HttpHeaders({
      'miToken': this.header!
    })
  };

  getCliente(){
    return this.http.get<Cliente>(this.url +'cliente/clientes', this.encabezado)
    .pipe(map((data: Cliente) => {
      //console.log(data)
      return data;
    }));
    
  }

  PostCliente(cliente: any){
    //console.log(cliente);
    return this.http.post<any>(this.url + 'cliente/add', cliente, this.encabezado);
  }

  public eliminarCliente(id: any){
    return this.http.delete<any>(this.url + 'cliente/delete/' + id, this.encabezado);
    
  }
  public putCliente(_id: String, cliente: any){
    return this.http.post<any>(this.url + 'cliente/update/'+ _id, cliente, this.encabezado);
    
  }

}
