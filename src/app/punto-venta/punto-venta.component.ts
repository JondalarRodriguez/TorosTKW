import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clienteservice/clientes.service';
import { CreditoService } from '../services/creditosService/credito.service';
import { InventarioService } from '../services/inventarioService/inventario.service';

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

  constructor(
    private sesioncliente: ClientesService,
    private serviceInventario: InventarioService,
    private serviceCreditos: CreditoService
  ) { }

  ngOnInit(): void {
    this.getClientes();
    this.getProducts();
  }

  public getClientes() {
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        //console.log(resp);
        this.clientes = resp;
        //console.log(this.clientes);
      }
    );
  }

  public getProducts() {
    this.serviceInventario.getProductos().subscribe(
      (resp) => {
        //console.log(resp);
        this.productos = resp;
        //console.log(this.clientes);
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
    alert("Cliente seleccionado " + cliente.Nombre);
    this.clientes = [];
    //console.log(this.ClienteVenta);

  }
  public TotalCobrar: string = "";


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
  public recibido: number = 0;
  public cambio: number = 0;

  public compra() {
    for (var i of this.Productventas) {
      var restandoExistencia = parseInt(i.Existencia) - 1;
      i.Existencia = String(restandoExistencia);
      //console.log(i.Folio)
      //console.log(i)
      this.serviceInventario.putProducto(i.Folio, i).subscribe(
        resp => {
          console.log("result: ", resp);
        }

      );
    }
    this.productos = [];
    this.getProducts();

  }
  public folioMayorString: string = "";
  public folioNumero: number = 0;

  public nextFolio() {
    
    
    for (const iterator of this.creditos) {
      var folioObtener = iterator.Folio;
      if (folioObtener <= iterator.Folio) {
        this.folioMayorString = iterator.Folio;
      } else {
        this.folioMayorString = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioMayorString) + 1;
    this.folioMayorString = String(this.folioNumero);
    }
    /*for (let index = 0; index < this.creditos.length; index++) {
      element = this.creditos[index];
      let folioObtener = element.Folio;
      if (folioObtener < element.Folio) {
        this.folioMayorString = element.Folio;
      } else {
        this.folioMayorString = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioMayorString);
    this.folioNumero += 1;
    this.folioMayorString = String(this.folioNumero);
  }*/

  public Cobrar() {

    if (this.recibido >= parseInt(this.TotalCobrar)) {
      this.cambio = this.recibido - parseInt(this.TotalCobrar);
      this.compra();

    } else {
      alert("Compra añadida a credito");
      this.compra();
      this.cambio = parseInt(this.TotalCobrar) - this.recibido;
      //Obteniendo Fecha
      const fecha = new Date();
      //Obtengo ultimo Folio
      this.nextFolio();
      //Genero el dato para mandar el nuevo credito
      var SendCredito: string = "";

      SendCredito = ('{ '
        + 'Folio:  ' + this.folioMayorString
        + ', RGI: ' + this.ClienteVenta.RGI
        + ', Nombre: ' + this.ClienteVenta.Nombre
        + ', Total: ' + this.cambio
        + ', Fecha: ' + fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()
        + ', Concepto : Compra }');
        console.log(this.folioMayorString);
        console.log(JSON.stringify(SendCredito));

    }


  }

  
 
}



