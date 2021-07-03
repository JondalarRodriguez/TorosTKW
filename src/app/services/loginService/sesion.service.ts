import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginI } from 'src/app/interfaces/login.interface';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }
  url = 'http://18.119.49.67:3000/';

  public iniciarSesion(sesion: loginI){
    return this.http.post<any>(this.url + 'user/login', sesion, {observe: "response"});
  }
}
