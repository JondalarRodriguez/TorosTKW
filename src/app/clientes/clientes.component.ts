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
    Folio: new FormControl(''),
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

  constructor(private router: Router,
    private sesioncliente: ClientesService) { }

  ngOnInit(): void {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        console.log(resp);
        this.clientes = resp;
        console.log(this.clientes);
      }
    );
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

  public nuevoCliente(form: String) {
    this.sesioncliente.PostCliente(form).subscribe(
      data => {
        if (data.status == 200) {
          alert("Datos guardados exitosmente");

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



  public obtenerDato(cliente : any){
    this.forUpdate = cliente;
    console.log(cliente);

  }

  public actualizarCliente(form: String){
    console.log(form);
  }

  public deleteCliente(folio: String){
    console.log("valor",  folio);
    this.sesioncliente.eliminarCliente(folio).subscribe(
      data =>{
        console.log("result: ", data);
      }

    );
    location.reload();
  }

}
