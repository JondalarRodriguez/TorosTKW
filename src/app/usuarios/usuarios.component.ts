import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarioservice/usuarios.service';
import { UsuarioI } from '../interfaces/usuarios.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarioForm = new FormGroup({
    id: new FormControl(''),
    usuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    apellido: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    direccion: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    telefono: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)]))
  });
  public actualizarUsuarioForm = new FormGroup({
    id: new FormControl(''),
    usuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(60)])),
    nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    apellido: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    direccion: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
    telefono: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)]))
  });

  public usuarios: any = [];
  public forUpdate: any = [];
  public Busqueda: string = "";

  constructor(private router: Router,
    private sesionUsuario: UsuariosService) { }

  ngOnInit(): void {

    this.sesionUsuario.getUsuario().subscribe(
      (resp) => {
        this.usuarios = resp.results;
      }
    );
    this.comprobarSesion();

  }


  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }

  public comprobarUsuario(form: any, actualizar: number){
    let existe = 0
    let usuarios = this.usuarios
    for (const usuario of usuarios) {

    if (form.usuario === usuario.usuario) {
      existe += 1;
    }else{
      existe = existe
    }
     
   }
   if(existe >= (1 + actualizar)){
    return true
   }else{
     return false
   }

  }

  public nuevoUsuario(form: UsuarioI) {

    let seRepite = this.comprobarUsuario(form, 0);

    if (seRepite == false){
    this.sesionUsuario.PostUsuario(form).subscribe(
      data => {
        if (data.ok == true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos guardados exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          location.reload();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Los datos no se pudieron guardar',
            showConfirmButton: false,
            timer: 1500
          })
        }
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Usuario existente',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  public obtenerDato(usuario: UsuarioI) {
    this.forUpdate = usuario;
    //console.log(usuario);
  }


  public actualizarUsuario(form: UsuarioI) {
    var id = this.forUpdate._id;
    //console.log(form);
    //console.log(id);

    this.sesionUsuario.putUsuario(id, form).subscribe(
      resp => {
        //console.log("result: ", resp);
      }

    );
    //location.reload();
  }

  public eliminarUsuario(id: String) {
    this.sesionUsuario.deleteUsuario(id).subscribe(
      data => {
        //console.log("result: ", data);
      }

    );
    location.reload();
  }



}
