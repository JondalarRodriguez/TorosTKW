import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginI } from '../interfaces/login.interface';
import { SesionService } from '../services/loginService/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)]))
  });

  public usuarioEncontrado: any = [];
  constructor(private router: Router,
    private sesionService: SesionService) { }

  ngOnInit(): void {
  }

  public iniciarSesion(form: loginI) {
    var id = form.username;
    var user = form.username;
    var pass = form.password;
console.log("usuario que estoy mandando", user)
console.log("contraseña que estoy mandando", pass)
    //console.log(id);
    this.sesionService.iniciarSesion(id, form).toPromise().then(
      data =>{
        this.usuarioEncontrado = data.body[0];
          //console.log("usuario del servidor",this.usuarioEncontrado.usuario);
          //console.log("contraseña del servidor",this.usuarioEncontrado.password);

          var userS = this.usuarioEncontrado.usuario;
          var passS = this.usuarioEncontrado.password;

          if (this.usuarioEncontrado === undefined) {
            alert("Usuario no encontrado");
          } else if(data.status === 200){
              //alert("Usuario encontrado");
              if(userS === user && passS === pass){
                alert("Usuario encontrado y autenticado")
              }else{
                alert("Usuario encontrado, usuario y contraseña incorrecto")
              }
          } else {
              alert("Error en el servidor");
            }

          }
    ).catch(
      error =>{
        console.log(error);
      }
      
    );


    /*
    .toPromise().then(
      data => {
        console.log(data);
      }
    ).catch{
      error => {
        console.log(error);
      }
      );
      */
    
    
    /*
    .subscribe(
        data => {
          //console.log(data);
          this.usuarioEncontrado = data.body[0];
          console.log(this.usuarioEncontrado);
          if (this.usuarioEncontrado === undefined) {
            alert("Usuario no encontrado");
          } else {
            if (data.status == 200) {
              alert("Usuario encontrado");
            } else {
              alert("Error en el servidor");
            }

          }
        },
        error => {
          console.log(error);
        });*/
    }


  private limpiarCampos() {
    this.loginForm.setValue({
      username: '',
      password: ''
    });
  }



}
