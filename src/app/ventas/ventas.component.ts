import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventarioService } from '../services/inventarioService/inventario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public inventarioForm = new FormGroup({
    Folio: new FormControl('', Validators.required),
    Nombre: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
    Costo: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])),
    Precio: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])),
    Existencia: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)]))
  });

  public inventarioFormActualizar = new FormGroup({
    Folio: new FormControl('', Validators.required),
    Nombre: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
    Costo: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])),
    Precio: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])),
    Existencia: new FormControl('',Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)]))
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos guardados exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          location.reload();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Los datos no se pudieron guardar',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      error => {
        console.log(error);
      }
    );
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Producto existente',
        showConfirmButton: false,
        timer: 1500
      })
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      }

    );
    location.reload();
    } else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Nombre de producto existente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



  /* borrar datos de la tabla de inventario */
  public deleteProducto(_id: String) {

    this.inventarioService.eliminarProducto(_id).subscribe(
      data => {

      }

    );
    location.reload();
  }

}
