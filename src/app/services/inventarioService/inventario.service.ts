import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from 'src/app/interfaces/inventario.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  url = 'http://3.18.46.141:3000/';

  header = sessionStorage.getItem('sesion');
  encabezado = {
    headers: new HttpHeaders({
      'miToken': this.header!
    })
  };

  getProductos(){
    return this.http.get<Inventario>(this.url + 'inventario/inventario', this.encabezado)
    .pipe(map((data: Inventario) =>{
      //console.log(data)
      return data;
    }));
  }

  PostProducto(product: any){
    return this.http.post<any>(this.url + 'inventario/add', product, this.encabezado);
  }

  public eliminarProducto(id: String){
    return this.http.delete<boolean>(this.url + 'inventario/product/' + id, this.encabezado);
    
  }
  public putProducto(id: String, product: any){
    return this.http.post<any>(this.url + 'inventario/update/' + id, product, this.encabezado);
    
  }
}
