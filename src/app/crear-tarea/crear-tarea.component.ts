import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/usuario';
import { SpService } from '../servicios/sp.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
})
export class CrearTareaComponent implements OnInit {
  usuario: User;
  allowedUsers = [];
  users = [];
  tareasArray = [];
  descripcionTarea: string;

  constructor(public servicio: SpService) {}

  async ngOnInit() {
    this.obtenerUsuario();
    this.consultarUsurarios();
  }

  obtenerUsuario() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  consultarUsurarios() {
    this.servicio
      .consultarUsuarios()
      .then((res) => {
        this.allowedUsers = res;
        this.users = this.allowedUsers.map((element) => element.usuario);
        this.validarPermisos();
      })
      .catch((err) => console.log(err));
  }

  validarPermisos() {
    let usuarioPermitido = this.users.filter((s) => {
      return s.Id === this.usuario.id;
    });
    if (usuarioPermitido.length === 0) {
      alert('Este usuario no tiene permisos');
    }
  }

  agregarTarea() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    let tarea = {
      descripcion: this.descripcionTarea,
      fechaEstimada: date,
      estado: 'pendiente'
    };

    this.tareasArray.push(tarea);
    this.descripcionTarea = '';
  }



}

 
