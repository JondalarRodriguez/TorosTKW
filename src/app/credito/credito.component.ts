import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditoService } from '../services/creditosService/credito.service';
import { Credito } from '../interfaces/creditos.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AbonoService } from '../services/abonosService/abono.service';
import { ClientesService } from '../services/clienteservice/clientes.service';

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
  public AbonoString: string = "";
  public Abonos: any = [];

  constructor(private router: Router,
    private sesioncredito: CreditoService,
    private abonosService: AbonoService,
    private ServiceClientes: ClientesService
  ) { }

  ngOnInit(): void {
    this.comprobarSesion();
    this.sesioncredito.getCreditos().subscribe(
      (resp) => {
        //console.log(resp);
        this.creditos = resp;
        //console.log(this.clientes); 
      }
    )
    this.getClientes();
  }

  public getCreditos() {
    this.sesioncredito.getCreditos().subscribe(
      (resp) => {
        //console.log(resp);
        this.creditos = resp;
        //console.log(this.clientes); 
      }
    )
  }
  public comprobarCrditosVacios() {
    let borrado = 0;

    console.log('comprobando Creditos')

    for (let credito of this.creditos) {

      if (credito.Total == "0") {
        console.log(credito.Folio)
        this.deleteCredito(credito.Folio)
        borrado++
        this.obtenerAbonos(credito.Folio)
        for (const Abono of this.Abonos) {
          this.abonosService.deleteAbono(Abono.Folio).subscribe(
            data => {
              console.log(data)
            }
          )
        }
      }
    }

    if (borrado >= 1) {
      location.reload()
    }
  }
  public deleteCredito(id: string) {
    this.sesioncredito.deleteCredito(id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }

  public nextFolio() {
    let element = 0;
    this.getCreditos();

    for (let i of this.creditos) {
      if (parseInt(i.Folio) > element) {
        element = parseInt(i.Folio)
      }
    }
    this.folioMayorString = String(element + 1);
    /*for (let index = 0; index < this.creditos.length; index++) {
      element = this.creditos[index];
      let folioObtener = element.Folio;
      if (folioObtener < element.Folio) {
        this.folioMayorString = element.Folio;
      } else {
        this.folioMayorString = folioObtener
      }
    }*/

  }

  public direccionCliente() {
    this.router.navigate(['clientes']);

  }


  public obtenerDato(credito: any) {
    this.forUpdate = credito;
    console.log(this.forUpdate.Folio);

  }

  /*
    ngOnInit(): void {
    }
  */

  onPrint() {
    window.print();
  }

  public obtenerAbonos(credito: any) {
    this.forUpdate = credito;
    this.abonosService.getAbonos(this.forUpdate.Folio).subscribe(
      (resp) => {

        this.Abonos = resp;
        //console.log(this.Abonos);
      }
    );
  }

  public enviarAbono() {

    let fecha = new Date();
    var abono;

    if (this.forUpdate.length == 0 || this.AbonoString == "") {

      alert("Falta agregar abono o escoger cliente")

    } else {
      if (this.forUpdate.Total > "0") {
        let correctoAbono = parseInt(this.forUpdate.Total) - parseInt(this.AbonoString)
        if (correctoAbono >= 0) {
          abono = {
            Folio: this.forUpdate.Folio,
            Nombre: this.forUpdate.Nombre,
            Fecha: (fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()),
            Monto: this.AbonoString
          }
          this.abonosService.PostAbono(abono).subscribe(
            data => {
              if (data.status == 200) {
                alert("Abono registrado")
                let resta: number = parseInt(this.forUpdate.Total) - parseInt(this.AbonoString)
                this.forUpdate.Total = String(resta)

                this.sesioncredito.putCredito(this.forUpdate.Folio, this.forUpdate).subscribe(
                  data => {
                    console.log(data)
                  }
                )
                location.reload()
              } else {
                alert('Error')
              }
            }, error => {
              alert(error)
            }
          )
        }else{
          alert('El abono excede la deuda')
        }
      } else {
        alert('El cliente a pagado toda su deuda, para eliminar presiona Eliminar')
      }
    }



  }


  public clientes: any = [];

  public getClientes() {
    this.ServiceClientes.getCliente().subscribe(
      data => {
        this.clientes = data
      }, error => {
        console.log(error)
      }
    );
  }

  public genararMensualidades() {
    this.nextFolio();
    for (const cliente of this.clientes) {
      let fecha = new Date();
      var exito;
      if (cliente.Mensualidad > 0) {

        let SendCredito = {
          "Folio": this.folioMayorString,
          "RGI": cliente.RGI,
          "Nombre": cliente.Nombre,
          "Total": cliente.Mensualidad,
          "Fecha": fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
          "Concepto": "Mensualidad"
        };
        this.folioMayorString = String(parseInt(this.folioMayorString) + 1)

        this.sesioncredito.PostCredito(SendCredito).subscribe(
          data => {
            if (data.status == 200) {
              console.log(data.status)
            } else {

              console.log(data.status)
            }
          },
          error => {
            console.log(error);
          }

        )

      }


    }
    location.reload()
    //if (exito == true){
    //location.reload()
    //}else{
    // alert('Ocurrio un error inesperado al generar los creditos')
    //}

  }


}
