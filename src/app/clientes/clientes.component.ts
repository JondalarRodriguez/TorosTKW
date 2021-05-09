import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public direccionCredito(){
    this.router.navigate(['credito']);

  }

  clientesArray = [
    {RGI:"1", Nombre:"Jondalar"},
    {RGI:"2", Nombre:"Antonio"},
    {RGI:"3", Nombre:"Lucero"},
    {RGI:"4", Nombre:"Angel"},
    ];

}
