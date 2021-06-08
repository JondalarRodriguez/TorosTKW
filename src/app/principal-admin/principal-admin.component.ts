import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public comprobarSesion() {
    if (sessionStorage.getItem('sesion') == undefined) {
      this.router.navigate([''])
    }
  }
}
