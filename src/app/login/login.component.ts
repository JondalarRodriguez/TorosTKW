import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Login = new LoginForm
   */
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(50)]))
  });
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public iniciarSesion(form: any){
    if(
      form.username == "antonio" &&
      form.password == "170204021"
    ){
      alert("Inicio de sesión exitoso");
      this.router.navigate(['admn']);
    }else{
      alert("Datos incorrectos");
      this.limpiarCampos();
    }
  }
  private limpiarCampos(){
    this.loginForm.setValue({
      username: '',
      password: ''
    });
  }



}
