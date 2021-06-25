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
    Folio: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Existencia: new FormControl('', Validators.required)
  });

  public inventarioFormActualizar = new FormGroup({
    Folio: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Costo: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Existencia: new FormControl('', Validators.required)
  });

  public productos: any = [];
  public forUpdate: any = [];
  public folioInventario = "";
  public folioNumero: number = 0;
  public Busqueda: string = "";


  constructor(private router: Router,
    private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.comprobarSesion();
    this.getProductos();
    
  }

  public getProductos() {
    this.inventarioService.getProductos().subscribe(
      (resp) => {
        this.productos = resp.results;
        this.nextFolio();
      }
    );
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate(['login'])
    }
  }

  public nextFolio() {
    let element = 0;
    for (let i of this.productos) {
      if (parseInt(i.Folio) > element) {
        element = parseInt(i.Folio)
      }
    }
    this.folioInventario = String(element + 1);
  }

  public comprobarNombre(form: any, actualizar: number){
    let existe = 0
    let productos = this.productos
    for (const producto of productos) {

    if (form.Nombre === producto.Nombre) {
      existe += 1;
    }else{
      existe = existe
    }
     
   }
   if(existe >= (1 + actualizar)){
    return true
   }else{
     return false
   }

  }

  
  /* se añaden nuevos producto a la tabla de inventario */
  public nuevoProducto(form: any) {
    let formulario = form;
    let repetido = this.comprobarNombre(formulario, 0)

    if (repetido == false){
    this.inventarioService.PostProducto(form).subscribe(
      data => {
        if (data.ok == true) {
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
    }else{
      alert("Producto ya registrado porfavor edita")
    }

  }

  public limpiarCampos(){
    location.reload()
  }

  /* se obtienen los datos de productos en editar  en inventario*/
  public obtenerDato(inventario: any) {
    this.forUpdate = inventario;
  }

  public actualizarProducto(form: any) {
    let formulario = form;
    let repetido = this.comprobarNombre(formulario, 1)

    if (repetido == false){ 
    var id: string = this.forUpdate._id;
    this.inventarioService.putProducto(id, form).subscribe(
      resp => {
        console.log("result: ", resp);
        alert("actualizado")
      }

    );
    location.reload();
    } else{
      alert("Producto ya esta registrado anteriormente, revisa el nombre")
    }
  }



  /* borrar datos de la tabla de inventario */
  public deleteProducto(_id: String) {
    console.log("valor", _id);
    this.inventarioService.eliminarProducto(_id).subscribe(
      data => {
        console.log("result: ", data);
      }

    );
    location.reload();
  }

}
