import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginI } from 'src/app/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }


  public iniciarSesion(id: String, sesion: loginI){
    return this.http.post<any>("http://localhost:4000/login/" + id, sesion, {observe: "response"});
  }
}
