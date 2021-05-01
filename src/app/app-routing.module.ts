import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditoComponent } from './credito/credito.component';
import { LoginComponent } from './login/login.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { PrincipalComponent } from './principal/principal.component';
import { VentasComponent } from './ventas/ventas.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "clientes", component: ClientesComponent},
  {path: "credito", component: CreditoComponent},
  {path: "login", component: LoginComponent},
  {path: "inventario", component: VentasComponent},
  {path: "admn", component: PrincipalAdminComponent},
  {path: "ventas", component: PuntoVentaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
