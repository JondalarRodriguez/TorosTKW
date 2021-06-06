import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from 'src/app/interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  getCliente(){
    return this.http.get<Inventario>('http://localhost:4000/inventario');
  }

  PostCliente(product: Inventario){
    console.log(product);
    return this.http.post<any>("http://localhost:4000/add/Inventario", product, {observe: "response"});
  }

  public eliminarCliente(id: String){
    return this.http.delete<boolean>("http://localhost:4000/product/" + id, {observe: 'response'});
    
  }
  public putCliente(id: String, cliente: any){
    return this.http.put<boolean>("http://localhost:4000/product/" + id, cliente, {observe: 'response'});
    
  }
}
