import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credito } from 'src/app/interfaces/creditos.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(
    private http: HttpClient
  ) { }

  getCreditos(){
    return this.http.get<Credito>('http://localhost:4000/Creditos');
  }

  PostCredito(Credito: any){
    return this.http.post<any>("http://localhost:4000/add//add/Credito", Credito, {observe: "response"});
  }
  ///Eliminar no esta disponible en el back end hay que ver como eliminar
  // los creditos en abonos no en creditos
  /*public eliminarProducto(id: String){
    return this.http.delete<boolean>("http://localhost:4000/product/" + id, {observe: 'response'});
    
  }*/
  public putCredito(id: String, Credito: any){
    return this.http.put<boolean>("http://localhost:4000/Credito/" + id, Credito, {observe: 'response'});
    
  }

}
