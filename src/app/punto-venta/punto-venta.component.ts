import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clienteservice/clientes.service';
import { CreditoService } from '../services/creditosService/credito.service';
import { InventarioService } from '../services/inventarioService/inventario.service';
import { RegistroVentasService } from '../services/registroVentasService/registro-ventas.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css']
})
export class PuntoVentaComponent implements OnInit {

  public clientes: any = [];
  public Busqueda: string = "";
  public ClienteVenta: any = [];
  public productos: any = [];
  public Productventas: any = [];
  public findProduct: string = "";
  public creditos: any = [];
  public folioMayorString: string = "";
  public folioNumero: number = 0;
  public TotalCobrar: string = "";
  public recibido: number = 0;
  public cambio: number = 0;
  public usuarioVenta: string = "";

  constructor(
    private sesioncliente: ClientesService,
    private serviceInventario: InventarioService,
    private serviceCreditos: CreditoService,
    private serviceRegistro: RegistroVentasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClientes();
    this.getProducts();
    this.getCreditos();
    this.comprobarSesion();
  }


  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }else{
      this.usuarioVenta = String(sessionStorage.getItem('sesion'))
    }
  }

  public getClientes() {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {

        this.clientes = resp;

      }
    );
  }



  public getProducts() {
    this.serviceInventario.getProductos().subscribe(
      (resp) => {

        this.productos = resp;

      }
    );
  }



  public getCreditos() {

    this.serviceCreditos.getCreditos().subscribe(
      (resp) => {
        this.creditos = resp;
      }
    );
  }



  public obtenerDatoCliente(cliente: any) {
    //Obtiene el cliente seleccionado y lo guarda para mandarlo en caso de ser necesario
    this.ClienteVenta = cliente;
    alert("Cliente seleccionado " + this.ClienteVenta.Nombre);
    this.clientes = [];
    //console.log(this.ClienteVenta);

  }



  public calcularTotal() {
    var precio = 0;
    if (this.Productventas == 0) {
      this.TotalCobrar = "0";
    } else {
      for (var suma of this.Productventas) {
        precio = parseInt(suma.Precio) + precio;
      };

      this.TotalCobrar = String(precio);
    }

  }




  public eliminarVenta(venta: any) {
    this.Productventas.splice(venta, 1);
    //console.log(this.Productventas);
    this.calcularTotal();
  }




  public obtenerDatoProducto(producto: any) {
    this.Productventas.push(producto);
    alert(producto.Nombre + " agregado");

    this.calcularTotal();
  }




  public compra() {
    for (var i of this.Productventas) {
      var restandoExistencia = parseInt(i.Existencia) - 1;
      i.Existencia = String(restandoExistencia);
      //console.log(i.Folio)
      //console.log(i)
      this.serviceInventario.putProducto(i.Folio, i).subscribe(
        resp => {
          var respuestaCompra = resp;
        }

      );
    }
    this.productos = [];
    this.getProducts();

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


  public RegistroVenta(Efectivo: string) {
    var fecha = new Date();
    var RegistroVenta: any;
    RegistroVenta = {
      Total: this.TotalCobrar,
      Dia: String(fecha.getDate()),
      Mes: String(fecha.getMonth() + 1),
      Año: String(fecha.getFullYear()),
      Vendedor: String(this.usuarioVenta),
      Efectivo: Efectivo

    }

    return RegistroVenta;

  }


  public Cobrar() {
    var registro;
    if (this.TotalCobrar != "" && this.TotalCobrar != "0") {
      if (this.recibido >= parseInt(this.TotalCobrar)) {
        this.cambio = this.recibido - parseInt(this.TotalCobrar);
        this.compra();
        //REGISTRANDO VENTA
        registro = this.RegistroVenta(this.TotalCobrar);

        this.serviceRegistro.PostRegistroVenta(registro).subscribe(
          data => {
            if (data.status == 200) {
              console.log("Compra registrada")
            }
            else {
              console.log(data.status)
            }
          },
          error => {
            console.log(error);
          });
        location.reload();

      } else {
        if (this.ClienteVenta == 0) {
          alert("Selecciona un cliente")
        } else {

          this.compra();
          this.cambio = parseInt(this.TotalCobrar) - this.recibido;
          //Obteniendo Fecha
          const fecha = new Date();
          //Obtengo ultimo Folio
          this.nextFolio();
          //Genero el dato para mandar el nuevo credito
          var SendCredito: any;

          SendCredito = {
            "Folio": this.folioMayorString,
            "RGI": this.ClienteVenta.RGI,
            "Nombre": this.ClienteVenta.Nombre,
            "Total": String(this.cambio),
            "Fecha": fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
            "Concepto": "Compra"
          };
          console.log(SendCredito);
          this.serviceCreditos.PostCredito(SendCredito).subscribe(
            data => {
              if (data.status == 200) {
                alert("Compra añadida a credito");
                location.reload();
              } else {
                alert("Error al añadir Credito");
              } console.log(data);
            },
            error => {
              console.log(error);
            }
          )

          //REGISTRANDO VENTAS
          registro = this.RegistroVenta(String(this.recibido));

          this.serviceRegistro.PostRegistroVenta(registro).subscribe(
            data => {
              if (data.status == 200) {
                console.log("Compra registrada")
              }
              else {
                console.log(data.status)
              }
            },
            error => {
              console.log(error);
            });

        }

      }
    } else {
      alert("Selecciona un producto")
    }
  }
  //===============REPORTES====================

  public reportes: any = [];

  public getReportes() {
    this.serviceRegistro.getRegistrosVentas().subscribe(
      (resp) => {
        this.reportes = resp;
      }
    );
  }

  public Reportes: any = [];

  public generarReportesDiarios() {
    this.Reportes = [];
    var fecha = new Date();
    for (const reporte of this.reportes) {
      if (reporte.Dia == String(fecha.getDate()) && reporte.Mes == String(fecha.getMonth() + 1)) {
        this.Reportes.push(reporte);
      }
    }
  }

  public generarReportesMensuales() {
    this.Reportes = [];
    var fecha = new Date();
    for (const reporte of this.reportes) {
      if (reporte.Mes == String(fecha.getMonth() + 1)) {
        this.Reportes.push(reporte);
      }
    }
  }

  public generarReportesAnteriores() {
    this.Reportes = [];
    var fecha = new Date();
    for (const reporte of this.reportes) {
      if (reporte.Mes != String(fecha.getMonth() + 1)) {
        this.Reportes.push(reporte);
      }
    }
  }
}



