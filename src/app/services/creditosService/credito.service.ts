import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credito } from 'src/app/interfaces/creditos.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private http: HttpClient) { }
  url = environment.url;

  getCreditos(){
    return this.http.get<Credito>(this.url + 'credito/creditos')
    .pipe(map((data: Credito) =>{
      //console.log(data)
      return data;
    }));
  }

  PostCredito(Credito: any){
    return this.http.post<any>(this.url +'credito/add', Credito, {observe: "response"});
  }

  public putCredito(id: String, Credito: any){
    return this.http.post<any>(this.url + 'credito/update/' + id, Credito, {observe: 'response'});
    
  }

  public deleteCredito(id: String){
    return this.http.delete<boolean>(this.url + 'credito/delete/' + id, {observe: 'response'})
  }

}
