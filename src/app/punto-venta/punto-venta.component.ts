import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clienteservice/clientes.service';
import { CreditoService } from '../services/creditosService/credito.service';
import { InventarioService } from '../services/inventarioService/inventario.service';
import { RegistroVentasService } from '../services/registroVentasService/registro-ventas.service';
import Swal from 'sweetalert2'

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
    } else {
      this.usuarioVenta = String(sessionStorage.getItem('usuario'))
    }
  }

  public getClientes() {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        this.clientes = resp.results;
      }
    );
  }

  public getProducts() {
    this.serviceInventario.getProductos().subscribe(
      (resp) => {
        this.productos = resp.results;
      }
    );
  }

  public getCreditos() {
    this.serviceCreditos.getCreditos().subscribe(
      (resp) => {
        this.creditos = resp.results;
      }
    );
  }



  public obtenerDatoCliente(cliente: any) {
    //Obtiene el cliente seleccionado y lo guarda para mandarlo en caso de ser necesario
    this.ClienteVenta = cliente;
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: this.ClienteVenta.Nombre,
      text: 'Cliente seleccionado',
      showConfirmButton: false,
      timer: 1500
    })
    this.clientes = [];
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
    /*Swal.fire({
      position: 'center',
      icon: 'info',
      title: producto.Nombre + ' agregado',
      showConfirmButton: false,
      timer: 1500
    })*/

    this.calcularTotal();
  }

  public compra() {
    for (let i of this.Productventas) {
      var restandoExistencia = parseInt(i.Existencia) - 1;
      i.Existencia = String(restandoExistencia);
      this.serviceInventario.putProducto(i._id, i).subscribe(
        resp => {
          var respuestaCompra = resp;
          //console.log(respuestaCompra);
        }

      );
    }
    this.productos = [];
    this.getProducts();

  }

  public limpiarTodo(){
    this.TotalCobrar = '0';
    this.Productventas = [];
    this.getClientes();
    this.ClienteVenta = [];
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
      Efectivo: Efectivo,
      Cliente: this.ClienteVenta.Nombre
    }
    return RegistroVenta;
  }

  public Cobrar() {
    var registro;
    if (this.TotalCobrar != "" && this.TotalCobrar != "0") {
      if (this.recibido >= parseInt(this.TotalCobrar)) {
        if (this.ClienteVenta == 0) {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Selecciona un cliente',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.cambio = this.recibido - parseInt(this.TotalCobrar);
          this.compra();
          //REGISTRANDO VENTA
          registro = this.RegistroVenta(this.TotalCobrar);

          this.serviceRegistro.PostRegistroVenta(registro).subscribe(
            data => {
              if (data.ok == true) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Compra registrada',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              else {
                //console.log(data.status)
              }
            },
            error => {
              console.log(error);
            });
          this.limpiarTodo();
        }
      } else {
        if (this.ClienteVenta == 0) {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Selecciona un cliente',
            showConfirmButton: false,
            timer: 1500
          })
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
          //console.log(SendCredito);
          this.serviceCreditos.PostCredito(SendCredito).subscribe(
            data => {
              if (data.ok == true) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Compra añadida a crédito',
                  showConfirmButton: false,
                  timer: 1500
                })
                location.reload();
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Error al añadir crédito',
                  showConfirmButton: false,
                  timer: 1500
                })
              } //console.log(data);
            },
            error => {
              console.log(error);
            }
          )

          //REGISTRANDO VENTAS
          registro = this.RegistroVenta(String(this.recibido));

          this.serviceRegistro.PostRegistroVenta(registro).subscribe(
            data => {
              if (data.ok == true) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Compra registrada',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              else {
                //console.log(data.status)
              }
            },
            error => {
              console.log(error);
            });
            this.limpiarTodo();
        }

      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Selecciona un producto',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  //===============REPORTES====================
  public reportes: any = [];

  public getReportes() {
    this.serviceRegistro.getRegistrosVentas().subscribe(
      (resp) => {
        this.reportes = resp.results;
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