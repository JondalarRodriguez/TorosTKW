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
  
  constructor(private router: Router,
              private sesioncliente: ClientesService) { }

  ngOnInit(): void {
    this.sesioncliente.getCliente().subscribe(
      (resp) =>{
        console.log(resp);
        this.clientes = resp;
        console.log(this.clientes);
      }
    );
  }

  public direccionCredito(){
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

public nuevoCliente(form: String){
  this.sesioncliente.PostCliente(form).subscribe(
    data =>{
      console.log(data);
    },
    error =>{
      console.log(error);
    }
  );
}
}
