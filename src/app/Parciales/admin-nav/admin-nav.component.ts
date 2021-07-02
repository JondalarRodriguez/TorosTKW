import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public CerrarSesion(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sesión cerrada',
      showConfirmButton: false,
      timer: 1500
    })

    sessionStorage.removeItem('sesion');

    this.router.navigate(['login']);
  }
}
