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
  public total: number = 0;
  public CantidadPorProducto: any = [];
  public calcularTotal(){

    console.log(this.CantidadPorProducto)


  }


  public obtenerDatoProducto(producto: any) {
    //Obtiene el cliente seleccionado y lo guarda para mandarlo en caso de ser necesario
    var coinsidencia = 0
    if (this.Productventas.length == 0) {
      this.Productventas.push(producto);
    } else {
      for (let productoRevisar of this.Productventas) {
        if (productoRevisar.Folio == producto.Folio) {
          console.log("Hay coninsidencia");
          coinsidencia = 0;
          break;
        } else {
          coinsidencia += 1;
        }
      }
      if (coinsidencia != 0) {
        this.Productventas.push(producto);

      }
    }
    this.calcularTotal();
  }
  
}

