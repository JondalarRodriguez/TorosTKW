import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clienteservice/clientes.service';
import { Cliente } from '../interfaces/clientes.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clienteForm = new FormGroup({
    folio: new FormControl(''),
    RGI: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    Nombre: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])),
    FechaIngreso: new FormControl(''),
    Direccion: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(35)])),
    Telefono: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])),
    Edad: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])),
    Horario: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    Clase: new FormControl('',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
    Mensualidad: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(4)]))
  });

  public clienteFormActualizar = new FormGroup({
    folio: new FormControl(''),
    RGI: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    Nombre: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])),
    FechaIngreso: new FormControl(''),
    Direccion: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(35)])),
    Telefono: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])),
    Edad: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])),
    Horario: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    Clase: new FormControl('',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
    Mensualidad: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(4)]))
  });

  public clientes: any = [];
  public forUpdate: any = [];
  public folioMayorString = "";
  public folioNumero: number = 0;
  public Busqueda: string = "";
  public dias: any = [];
  public meses: any = [];
  public anos: any = [];

  constructor(private router: Router,
    private sesioncliente: ClientesService
  ) { }

  ngOnInit(): void {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        this.clientes = resp.results;
        this.nextFolio();
      }
    );
    this.comprobarSesion()
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }


  public nextFolio() {
    let element = 0;
    for (let i of this.clientes) {
      if (parseInt(i.folio) > element) {
        element = parseInt(i.folio)
      }
    }
    this.folioMayorString = String(element + 1);
  }

  public direccionCredito() {
    this.router.navigate(['credito']);

  }

  public nuevoCliente(form: any) {
    let formulario = form;
    let comprobacionRGI = this.comprobarRGI(form, 0);
    if (comprobacionRGI == false) {
      this.sesioncliente.PostCliente(form).subscribe(
        data => {
          if (data.ok == true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Datos guardados correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'los datos no se pudieron guardar',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'RGI registrado anteriormente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  public comprobarRGI(formulario: any, actualizar: number) {
    let comprobacionRGI: number = 0;
    for (const cliente of this.clientes) {
      if (cliente.RGI == formulario.RGI) {
        comprobacionRGI += 1;
      }
    }
    //console.log(comprobacionRGI);
    if (comprobacionRGI >= (1 + actualizar)) {
      return true
    } else {
      return false
    }
  }

  public obtenerDato(cliente: any) {
    this.forUpdate = cliente;
  }

  public actualizarCliente(form: any) {
    var id = this.forUpdate._id;
    let repetido = this.comprobarRGI(form, 1)
    if (repetido == false) {
      this.sesioncliente.putCliente(id, form).subscribe(
        resp => {
          if (resp.ok == true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente actualizado',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error al actualizar cliente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          }
        }

      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'RGI existente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  public deleteCliente(id: String) {
    this.sesioncliente.eliminarCliente(id).subscribe(
      data => {
        if (data.ok == true) {
          location.reload();
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al eliminar cliente',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

    );
  }
}
