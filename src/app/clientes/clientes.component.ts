import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clienteservice/clientes.service';
import { Cliente } from '../interfaces/clientes.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clienteForm = new FormGroup({
    folio: new FormControl(''),
    RGI: new FormControl(''),
    Nombre: new FormControl(''),
    FechaIngreso: new FormControl(''),
    Direccion: new FormControl(''),
    Telefono: new FormControl(''),
    Edad: new FormControl(''),
    Horario: new FormControl(''),
    Clase: new FormControl(''),
    Mensualidad: new FormControl('')
  });

  public clienteFormActualizar = new FormGroup({
    folio: new FormControl(''),
    RGI: new FormControl(''),
    Nombre: new FormControl(''),
    FechaIngreso: new FormControl(''),
    Direccion: new FormControl(''),
    Telefono: new FormControl(''),
    Edad: new FormControl(''),
    Horario: new FormControl(''),
    Clase: new FormControl(''),
    Mensualidad: new FormControl('')
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
        //console.log(resp);
        this.clientes = resp.results;
        //console.log(this.clientes);

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
  /*
     public obtenerClientes(){
       console.log("obtener cliente");
       this.sesioncliente.getCliente().subscribe(
         data =>{
           console.log(data);
         }
       );
     }
  */


  public nuevoCliente(form: any) {
    let formulario = form;
    let comprobacionRGI: number = 0;
    for (const cliente of this.clientes) {
      if (cliente.RGI == formulario.RGI) {
        comprobacionRGI++;
        //console.log(comprobacionRGI)
        break
      }

    }

    if (comprobacionRGI == 0) {
      this.sesioncliente.PostCliente(form).subscribe(
        data => {
          if (data.ok == true) {
            alert("Datos guardados exitosmente");
            location.reload();
          } else {
            alert("Los datos no se pudieron guardar");
          }
          //console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      alert('RGI registrado anteriormente')
    }
  }



  public obtenerDato(cliente: any) {
    this.forUpdate = cliente;
    //console.log(cliente);

  }

  public actualizarCliente(form: any) {
    var id = this.forUpdate._id;
    //console.log(form);
    //console.log(id);

    this.sesioncliente.putCliente(id, form).subscribe(
      resp => {
        if (resp.ok == true){
          alert('Cliente Actualizado')
        }else{
          alert('error al actualizar')
          location.reload();
        }
      }

    );
    //location.reload();
  }


  public deleteCliente(id: String) {
    this.sesioncliente.eliminarCliente(id).subscribe(
      data => {
        if (data.ok == true){
          location.reload();
        }
        else{
          alert('Error al eliminar')
        }
      }

    );
  }
}
