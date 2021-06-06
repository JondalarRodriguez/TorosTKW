import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  getInventario(){
    return this.http.get<Inventario>('http://localhost:4000/inventario');
  }

  PostInventario(inventario: any){
    console.log(inventario);
    return this.http.post<any>("http://localhost:4000/add", inventario, {observe: "response"});
  }

  public eliminarInventario(id: String){
    return this.http.delete<boolean>("http://localhost:4200/inventario/" + id, {observe: 'response'});
    
  }
  public putInventario(id: String, cliente: any){
    return this.http.put<boolean>("http://localhost:4200/inventario/" + id, cliente, {observe: 'response'});
    
  }
 
 

}
