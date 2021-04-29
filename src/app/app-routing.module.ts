import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditoComponent } from './credito/credito.component';
import { LoginComponent } from './login/login.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { PrincipalComponent } from './principal/principal.component';
import { VentasComponent } from './ventas/ventas.component';
import { AgregarComponent } from './ventas/agregar/agregar.component';
import { EditarComponent } from './ventas/editar/editar.component';
const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "clientes", component: ClientesComponent},
  {path: "credito", component: CreditoComponent},
  {path: "login", component: LoginComponent},
  {path: "inventario", component: VentasComponent},
  {path: "admn", component: PrincipalAdminComponent},
  {path: "agregar", component: AgregarComponent},
  {path: "editar", component: EditarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
