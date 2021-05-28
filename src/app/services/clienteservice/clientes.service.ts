import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Cliente } from '../../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient) { }

  getCliente(){
    return this.http.get<Cliente>('http://localhost:4000/clientes');
  }

  PostCliente(cliente: any){
    console.log(cliente);
    return this.http.post<any>("http://localhost:4000/add", cliente, {observe: "response"});
  }

  public eliminarCliente(id: String){
    return this.http.delete<boolean>("http://localhost:4000/clientes/" + id, {observe: 'response'});
    
  }
}
