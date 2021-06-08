import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Abono } from 'src/app/interfaces/abonos.interface';

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  constructor(
    private http: HttpClient
  ) { }

  getAbonos(){
    return this.http.get<Abono>('http://localhost:4000/Abonos');
  }

  PostAbono(Abono: any){
    return this.http.post<any>("http://localhost:4000/add/Abono", Abono, {observe: "response"});
  }
  ///Eliminar no esta disponible en el back end hay que ver como eliminar
  // los creditos en abonos no en creditos
  /*public eliminarProducto(id: String){
    return this.http.delete<boolean>("http://localhost:4000/product/" + id, {observe: 'response'});
    
  }*/
  public putAbono(id: String, Abono: any){
    return this.http.put<boolean>("http://localhost:4000/Abono/" + id, Abono, {observe: 'response'});
    
  }

}