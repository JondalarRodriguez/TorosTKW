import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventarioService } from '../services/inventarioService/inventario.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  
  public inventarioForm = new FormGroup({
    Folio: new FormControl(''),
    Nombre: new FormControl(''),
    Costo: new FormControl(''),
    Precio: new FormControl(''),
    Existencia: new FormControl('')
  });

  public inventarioFormActualizar = new FormGroup({
    Folio: new FormControl(''),
    Nombre: new FormControl(''),
    Costo: new FormControl(''),
    Precio: new FormControl(''),
    Existencia: new FormControl('')
  });

  public productos: any = [];
  public forUpdate: any = [];
  public folioInventario = "";
  public folioNumero: number = 0;
  public Busqueda: string = "";

  
  constructor(private router: Router,
    private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioService.getProductos().subscribe(
      (resp) => {
        this.productos = resp;
        this.nextFolio();
      }
    );
  }
  
  public nextFolio() {
    let element;
    for (let index = 0; index < this.productos.length; index++) {
      element = this.productos[index];
      let folioObtener = element.Folio;
      if (folioObtener < element.Folio) {
        this.folioInventario= element.Folio;
      }else{
        this.folioInventario = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioInventario);
    this.folioNumero += 1;
    this.folioInventario = String(this.folioNumero);
  }
    public direccionCredito() {
    this.router.navigate(['credito']);

  }
/* se añaden nuevos producto a la tabla de inventario */
  public nuevoProducto(form: String) {

    this.inventarioService.PostProducto(form).subscribe(
      data => {
        if (data.status == 200) {
          alert("Datos guardados exitosmente");
          location.reload();
        } else {
          alert("Los datos no se pudieron guardar");
        }
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

  }

/* se obtienen los datos de productos en editar  en inventario*/
  public obtenerDato(inventario: any) {
    this.forUpdate = inventario;
    console.log(inventario);
  }

  public actualizarProducto(form: any) {
    var id = this.forUpdate.folio;
    console.log(form);
    console.log(id);

    this.inventarioService.putProducto(id, form).subscribe(
      resp => {
        console.log("result: ", resp);
      }

    );
    location.reload();
  }



  /* borrar datos de la tabla de inventario */
  public deleteProducto(Folio: String) {
    console.log("valor", Folio);
    this.inventarioService.eliminarProducto(Folio).subscribe(
      data => {
        console.log("result: ", data);
      }

    );
    location.reload();
  }

}
