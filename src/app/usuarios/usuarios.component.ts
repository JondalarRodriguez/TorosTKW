import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarioservice/usuarios.service';
import { UsuarioI } from '../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarioForm = new FormGroup({
    id: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl('')
  });
  public actualizarUsuarioForm = new FormGroup({
    id: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl('')
  });
  
  public usuarios: any = [];
  public forUpdate: any = [];
  public Busqueda: string = "";

  constructor(private router: Router,
    private sesionUsuario: UsuariosService) { }

  ngOnInit(): void {

    this.sesionUsuario.getUsuario().subscribe(
      (resp) => {
        this.usuarios = resp;
      }
    );


  }

  public nuevoUsuario(form:UsuarioI) {

    this.sesionUsuario.PostUsuario(form).subscribe(
      data => {
        if (data.status == 200) {
          alert("Datos guardados exitosmente");
          location.reload();
        } else {
          alert("Los datos no se pudieron guardr");
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

  }

  public obtenerDato(usuario:UsuarioI) {
    this.forUpdate = usuario;
    console.log(usuario);
  }


  public actualizarUsuario(form: UsuarioI) {
    var id = this.forUpdate.usuario;
    console.log(form);
    console.log(id);

    this.sesionUsuario.putUsuario(id, form).subscribe(
      resp => {
        console.log("result: ", resp);
      }

    );
    location.reload();
  }

  public eliminarUsuario(id: String){
    this.sesionUsuario.deleteUsuario(id).subscribe(
      data => {
        console.log("result: ", data);
      }

    );
    location.reload();
  }



}
