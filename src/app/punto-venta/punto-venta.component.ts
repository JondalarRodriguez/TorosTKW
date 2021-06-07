import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clienteservice/clientes.service';
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

  constructor(
    private sesioncliente: ClientesService,
    private serviceInventario: InventarioService
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
    console.log(this.Productventas);
    this.calcularTotal();
  }


  public obtenerDatoProducto(producto: any) {
    this.Productventas.push(producto);
    alert(producto.Nombre + " agregado");

    this.calcularTotal();
  }
  public recibido: number = 0;
  public cambio: number = 0;

  public Cobrar() {

    if (this.recibido >= parseInt(this.TotalCobrar)) {
      this.cambio = this.recibido - parseInt(this.TotalCobrar);
      for (var i of this.Productventas) {
        i.Existencia = parseInt(i.Existencia) - 1;
        this.serviceInventario.putProducto(i.Folio, i)
      }
      this.productos = [];
      this.getProducts();

    } else {
      alert("Compra añadida a credito");
    }


  }
}



