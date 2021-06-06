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

  constructor(
    private sesioncliente: ClientesService,
    private serviceInventario: InventarioService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  public getClientes(){
    this.sesioncliente.getCliente().subscribe(
      (resp) => {
        //console.log(resp);
        this.clientes = resp;
        //console.log(this.clientes);
      }
    );
  }

  public getProducts(){
    this.serviceInventario.getProductos().subscribe(
      (resp) => {
        //console.log(resp);
        this.clientes = resp;
        //console.log(this.clientes);
      }
    );
  }

  public obtenerDato(cliente: any) {
    //Obtiene el cliente seleccionado y lo guarda para mandarlo en caso de ser necesario
    this.ClienteVenta = cliente;
    alert("Cliente seleccionado " + cliente.Nombre);
    this.clientes = [];
    //console.log(this.ClienteVenta);

  }
  
}
