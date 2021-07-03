import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Abono } from 'src/app/interfaces/abonos.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  constructor(private http: HttpClient) { }
  url = 'http://18.119.49.67:3000/'

  header = sessionStorage.getItem('sesion');
  encabezado = {
    headers: new HttpHeaders({
      'miToken': this.header!
    })
  };


  getAbonos(_id: String){
    return this.http.get<Abono>(this.url + 'abono/abonos/' + _id, this.encabezado)
    .pipe(map((data: Abono) =>{
      //console.log(data)
      return data;
    }));
  }

  PostAbono(Abono: any){
    return this.http.post<any>(this.url + 'abono/add', Abono, this.encabezado);
  }
  ///Eliminar no esta disponible en el back end hay que ver como eliminar
  // los creditos en abonos no en creditos
  /*public eliminarProducto(id: String){
    return this.http.delete<boolean>("http://localhost:4000/product/" + id, {observe: 'response'});
    
  }*/

  public deleteAbono(_id: String){
    return this.http.delete<boolean>(this.url + 'abono/delete/' + _id, this.encabezado)
  }

}