import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  @Input() usuario: string;
  @Input() user: User;

  ngOnInit(): void {
    
  }

  irApendientes() {
    this.router.navigate(['/mis-pendientes'], { queryParams:  {'idUsuario': this.user.id}  });
  }

}
