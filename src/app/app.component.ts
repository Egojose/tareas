import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/usuario';
import { SpService } from './servicios/sp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tareas-app';
  usuario: User;

  constructor(public servicio: SpService) {}


  ngOnInit() {
    this.obtenerInformacionUsuario();
  }

  obtenerInformacionUsuario() {
    this.servicio.obtenerUsuarioActual().subscribe(
      (res) => {
        const {Title:name, Email:email, Id:id} = res;
        this.usuario = {name, email, id };
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        console.log(this.usuario)
      }
    )
  }
}
