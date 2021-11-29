import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
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
  aprobador: User;

  constructor(public servicio: SpService, public toaster: ToastrService) {}

  async ngOnInit() {
    this.obtenerUsuario();
    this.consultarUsurarios();
  }

  obtenerUsuario() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.aprobador = JSON.parse(sessionStorage.getItem('aprobador'));
  }

  consultarUsurarios() {
    this.servicio
      .consultarUsuarios()
      .then((res) => {
        this.allowedUsers = res;
        this.users = this.allowedUsers.map((element) => element.usuario);
        this.validarPermisos();
        // this.obtenerAprobador();
      })
      .catch((err) => console.log(err));
  }

  // obtenerAprobador() {
  //   let data;
  //   data = this.allowedUsers.filter((i) => i.usuario.Id === this.usuario.id);
  //   const aprobadores = data[0].aprobadores;
  //   const { Id: id, EMail: email, Title: name } = aprobadores;
  //   this.aprobador = { id, name, email };
  //   console.log(this.aprobador);
  // }

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
      estado: 'pendiente',
      aprobadorId: this.aprobador.id,
      responsableId: this.usuario.id
    };

    this.tareasArray.push(tarea);
    this.descripcionTarea = '';
  }

  obtenerFormatoFecha(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
    } 

  showSuccess(mensaje: string) {
    this.toaster.success(mensaje, 'Correcto');
  }

  showWarning(mensaje: string) {
    this.toaster.warning(mensaje, 'Cuidado');
  }

  showError(mensaje: string) {
    this.toaster.error(mensaje, 'Error');
  }

  showInfo(mensaje: string) {
    this.toaster.info(mensaje, 'Información');
  }
}

 
