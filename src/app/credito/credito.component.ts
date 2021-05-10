import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent implements OnInit {

  constructor(private router: Router) { }

  public direccionCliente(){
    this.router.navigate(['clientes']);

  }

  ngOnInit(): void {
  }

  onPrint(){
    window.print();
}

}
