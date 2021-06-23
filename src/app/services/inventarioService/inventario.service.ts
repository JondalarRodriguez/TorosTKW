import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from 'src/app/interfaces/inventario.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  url = environment.url;

  getProductos(){
    return this.http.get<Inventario>(this.url + 'inventario/inventario')
    .pipe(map((data: Inventario) =>{
      //console.log(data)
      return data;
    }));
  }

  PostProducto(product: any){
    return this.http.post<any>(this.url + 'inventario/add', product, {observe: "response"});
  }

  public eliminarProducto(id: String){
    return this.http.delete<boolean>(this.url + 'inventario/product/' + id, {observe: 'response'});
    
  }
  public putProducto(id: String, product: any){
    return this.http.post<any>(this.url + 'inventario/update/' + id, product, {observe: 'response'});
    
  }
}
