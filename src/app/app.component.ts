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
  allowedUsers = [];
  users = [];
  aprobador: User;

  constructor(public servicio: SpService) {}


  ngOnInit() {
    this.obtenerInformacionUsuario();
    this.consultarUsurarios()
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

  consultarUsurarios() {
    this.servicio
      .consultarUsuarios()
      .then((res) => {
        this.allowedUsers = res;
        this.users = this.allowedUsers.map((element) => element.usuario);
        this.obtenerAprobador();
      })
      .catch((err) => console.log(err));
  }

  obtenerAprobador() {
    let data;
    data = this.allowedUsers.filter((i) => i.usuario.Id === this.usuario.id);
    const aprobadores = data[0].aprobadores;
    const { Id: id, EMail: email, Title: name } = aprobadores;
    this.aprobador = { id, name, email };
    sessionStorage.setItem('aprobador', JSON.stringify(this.aprobador))
    console.log(this.aprobador);
  }
}
