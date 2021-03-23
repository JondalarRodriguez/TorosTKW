import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditoComponent } from './credito/credito.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "Clientes", component: ClientesComponent},
  {path: "Credito", component: CreditoComponent},
  {path: "Login", component: LoginComponent},
  {path: "Ventas", component: VentasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
