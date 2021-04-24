import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public CerrarSesion(){
    alert("Sesión Cerrada (función en proceso)");
  }
}
