import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clienteservice/clientes.service';
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
    Nombre: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Existencia: new FormControl('', Validators.required)
  });
/*
  public inventarioFormActualizar = new FormGroup({
    folio: new FormControl(''),
    Nombre: new FormControl(''),
    Costo: new FormControl(''),
    Precio: new FormControl(''),
    Existencia: new FormControl('')
  });
*/
  public productos: any = [];
  public forUpdate: any = [];
  public folioMayorString = "";
  public folioNumero: number = 0;
  public Busqueda: string = "";

  
  constructor(private router: Router,
    private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioService.getProductos().subscribe(
      (resp) => {
        //console.log(resp);
        this.productos = resp;
        //console.log(this.clientes);

        this.nextFolio();
      }
    );
  }
  
  public nextFolio() {
    let element;
    for (let index = 0; index < this.productos.length; index++) {
      element = this.productos[index];
      let folioObtener = element.folio;
      if (folioObtener < element.folio) {
        this.folioMayorString= element.folio;
      }else{
        this.folioMayorString = folioObtener
      }
    }

    this.folioNumero = parseInt(this.folioMayorString);
    this.folioNumero += 1;
    this.folioMayorString = String(this.folioNumero);
  }

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
