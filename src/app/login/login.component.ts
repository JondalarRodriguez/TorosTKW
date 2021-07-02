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
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)]))
  });

  public usuarioEncontrado: any = [];
  constructor(private router: Router,
    private sesionService: SesionService) { }

  ngOnInit(): void {
    this.comprobarSesion()
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') != undefined) {
      this.router.navigate(['ventas'])
    }
  }

  public iniciarSesion(form: loginI) {
    var id = form.username;
    var user = form.username;
    var pass = form.password;
    //console.log("usuario que estoy mandando", user)
    //console.log("contraseña que estoy mandando", pass)
    //console.log(id);
    this.sesionService.iniciarSesion(form).toPromise().then(
      data => {
        
        let variable = data.body
        if (variable.ok == false){
          alert("Datos incorrectos")
        }else if (variable.ok == true){
          sessionStorage.setItem('sesion', variable.token);
          sessionStorage.setItem('usuario', form.username)      
          alert("Usuario encontrado y autenticado")
          this.router.navigate(['ventas'])
        }

        //this.usuarioEncontrado = data.body[0];
        //console.log("usuario del servidor",this.usuarioEncontrado.usuario);
        //console.log("contraseña del servidor",this.usuarioEncontrado.password);


/*
        if (this.usuarioEncontrado === undefined) {
          alert("Usuario no encontrado");
        } else if (data.status === 200) {
          //alert("Usuario encontrado");
          var userS = this.usuarioEncontrado.usuario;
          var passS = this.usuarioEncontrado.password;
          if (userS === user && passS === pass) {
            alert("Usuario encontrado y autenticado")
            this.router.navigate(['ventas'])
            sessionStorage.setItem('sesion', userS);
            console.log(sessionStorage.getItem('sesion'))
          } else {
            alert("Contraseña incorrecta")
          }
        } else {
          alert("Error en el servidor");
        }
*/
      }
    ).catch(
      error => {
        console.log(error);
      }

    );

    //CODIGO GUARDADO PARA CUANDO SE ENCRIPTE LA INFORMACIÓN

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
