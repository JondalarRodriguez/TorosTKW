import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditoComponent } from './credito/credito.component';
import { VentasComponent } from './ventas/ventas.component';
import { NavComponent } from './Parciales/nav/nav.component';
import { FooterComponent } from './Parciales/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavComponent } from './Parciales/admin-nav/admin-nav.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { FooterAdminComponent } from './Parciales/footer-admin/footer-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    CreditoComponent,
    VentasComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    PrincipalComponent,
    AdminNavComponent,
    PrincipalAdminComponent,
    PuntoVentaComponent,
    FooterAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
