import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registroVentas } from 'src/app/interfaces/registroVentas.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroVentasService {

  constructor(private http: HttpClient) { }
  url = 'http://3.18.46.141:3000/';

  header = sessionStorage.getItem('sesion');
  encabezado = {
    headers: new HttpHeaders({
      'miToken': this.header!
    })
  };

  getRegistrosVentas(){
    return this.http.get<registroVentas>(this.url +'ventas/ventas', this.encabezado)
    .pipe(map((data: registroVentas) => {
      return data;
    }));
  }

  PostRegistroVenta(registro: any){
    return this.http.post<any>(this.url + 'ventas/add', registro, this.encabezado);
  }


}
