import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registroVentas } from 'src/app/interfaces/registroVentas.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroVentasService {

  constructor(private http: HttpClient) { }

  getProductos(){
    return this.http.get<registroVentas>('http://localhost:4000/Ventas');
  }

  PostProducto(registro: any){
    return this.http.post<any>("http://localhost:4000/add/Venta", registro, {observe: "response"});
  }


}
