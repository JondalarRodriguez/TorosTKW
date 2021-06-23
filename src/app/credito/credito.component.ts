import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditoService } from '../services/creditosService/credito.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AbonoService } from '../services/abonosService/abono.service';
import { ClientesService } from '../services/clienteservice/clientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  public arrayAbonosEliminar: any = [];

  constructor(private router: Router,
    private sesioncredito: CreditoService,
    private abonosService: AbonoService,
    private ServiceClientes: ClientesService,

  ) { }



  ngOnInit(): void {
    this.comprobarSesion();
    this.getCreditos();
    this.getClientes();
  }

  public getCreditos() {
    this.sesioncredito.getCreditos().subscribe(
      (resp) => {
        //console.log(resp);
        this.creditos = resp.results;
        //console.log(this.clientes); 
      }
    )
  }


  public comprobarCrditosVacios() {
    for (let credito of this.creditos) {
      if (credito.Total == "0") {

        this.arrayAbonosEliminar.push(credito.Folio);
        this.deleteCredito(credito._id);
      }
    }

    if (this.arrayAbonosEliminar.length > 0) {
      this.deleteAbono()
    }
  }


  public deleteCredito(id: string) {
    this.sesioncredito.deleteCredito(id).subscribe(
      data => {
        console.log(data)
      }
    )
    for (const iterator of this.creditos) {
      if(iterator._id == id){
        this.creditos.splice(iterator, 1)
      }
    }

  }

  public deleteAbono() {
    console.log(this.arrayAbonosEliminar)
    if (this.arrayAbonosEliminar.length > 0) {
      console.log('borrando')
      for (let Abono of this.arrayAbonosEliminar) {
        this.abonosService.getAbonos(Abono).subscribe(
          resp => {
            this.Abonos = resp;
            console.log(this.Abonos)
            for (const iterator of this.Abonos) {
              this.abonosService.deleteAbono(iterator.Folio).subscribe(
                data => {
                  console.log(data)
                }
              )
              console.log('abono borrado')
            }
          });
      }
    } else {
      console.log('array vacio')
    }
    
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

  public imprimirCreditos(): void {
    const DATA = document.getElementById('htmlData')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/png');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'JPEG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }


  public imprimirAbonos(): void {
    const DATA = document.getElementById('DataAbonosTable')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
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

                this.sesioncredito.putCredito(this.forUpdate._id, this.forUpdate).subscribe(
                  data => {
                    console.log(data)
                  }
                )
                //location.reload()
              } else {
                alert('Error')
              }
            }, error => {
              alert(error)
            }
          )
        } else {
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
        this.clientes = data.results
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
        console.log(SendCredito)
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
