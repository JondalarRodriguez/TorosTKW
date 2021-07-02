import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginI } from '../interfaces/login.interface';
import { SesionService } from '../services/loginService/sesion.service';
import Swal from 'sweetalert2'


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
    this.sesionService.iniciarSesion(form).toPromise().then(
      data => {
        let variable = data.body
        if (variable.ok == false){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos incorrectos',
            showConfirmButton: false,
            timer: 1500
          })
        }else if (variable.ok == true){
          sessionStorage.setItem('sesion', variable.token);
          sessionStorage.setItem('usuario', form.username)      
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Autenticación exitosa',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['ventas'])
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }
  private limpiarCampos() {
    this.loginForm.setValue({
      username: '',
      password: ''
    });
  }
}
