import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/usuario';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.sass']
})
export class CrearTareaComponent implements OnInit {

  usuario: User

  constructor() { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log('hola usuario', this.usuario);
  }

}
