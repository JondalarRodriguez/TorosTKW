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
  public diaSeleccionado: string = "1";
  public mesSeleccionado: string = "1";
  public añoSeleccionado: string = "2021"

  
  constructor(private router: Router,
    private sesioncliente: ClientesService
    ) { }

  ngOnInit(): void {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        //console.log(resp);
        this.clientes = resp;
        //console.log(this.clientes);

        this.nextFolio();
      }
    );
    this.comprobarSesion()
    this.generandoFecha()
  }

  public generandoFecha(){
    for (let index = 1; index <= 31; index++) {
      this.dias.push(String(index))
    }
    for (let index = 1; index <= 12; index++) {
      this.meses.push(String(index))
    }for (let index = 2021; index <= 2031; index++) {
      this.anos.push(String(index))
    }
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }


  public nextFolio() {
    let element;
    for (let index = 0; index < this.clientes.length; index++) {
      element = this.clientes[index];
      let folioObtener = element.folio;
      if (folioObtener <= element.folio) {
        this.folioMayorString = element.folio;
      } else {
        this.folioMayorString = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioMayorString);
    this.folioNumero += 1;
    this.folioMayorString = String(this.folioNumero);
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
        console.log(comprobacionRGI)
        break
      }

    }

    if (comprobacionRGI == 0) {
      this.sesioncliente.PostCliente(form).subscribe(
        data => {
          if (data.status == 200) {
            alert("Datos guardados exitosmente");
            location.reload();
          } else {
            alert("Los datos no se pudieron guardar");
          }
          console.log(data);
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
    console.log(cliente);

  }

  public actualizarCliente(form: any) {
    var id = this.forUpdate.folio;
    console.log(form);
    console.log(id);

    this.sesioncliente.putCliente(id, form).subscribe(
      resp => {
        console.log("result: ", resp);
      }

    );
    location.reload();
  }


  public deleteCliente(folio: String) {
    console.log("valor", folio);
    this.sesioncliente.eliminarCliente(folio).subscribe(
      data => {
        console.log("result: ", data);
      }

    );
    location.reload();
  }
}
