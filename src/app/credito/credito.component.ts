import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditoService } from '../services/creditosService/credito.service';
import { Credito } from '../interfaces/creditos.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent implements OnInit {

  public creditoForm = new FormGroup({
    folio: new FormControl(''),
    RGI: new FormControl(''),
    Nombre: new FormControl(''),
    Total: new FormControl(''),
    Fecha: new FormControl(''),
    Concepto: new FormControl(''),
  });

  public creditos: any = [];
  public forUpdate: any = [];
  public folioMayorString = "";
  public folioNumero: number = 0;

  constructor(private router: Router,
    private sesioncredito: CreditoService) { }

  ngOnInit(): void {
    this.sesioncredito.getCreditos().subscribe(
      (resp) => {
        //console.log(resp);
        this.creditos = resp;
        //console.log(this.clientes);

        this.nextFolio();
      }
    );
    this.comprobarSesion();
  }


  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }

  public nextFolio() {
    let element;
    for (let index = 0; index < this.creditos.length; index++) {
      element = this.creditos[index];
      let folioObtener = element.folio;
      if (folioObtener < element.folio) {
        this.folioMayorString = element.folio;
      } else {
        this.folioMayorString = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioMayorString);
    this.folioNumero += 1;
    this.folioMayorString = String(this.folioNumero);
  }

  public direccionCliente() {
    this.router.navigate(['clientes']);

  }


  public obtenerDato(credito: any) {
    this.forUpdate = credito;
    console.log(this.forUpdate.Nombre);

  }

  /*
    ngOnInit(): void {
    }
  */

  onPrint() {
    window.print();
  }

}
