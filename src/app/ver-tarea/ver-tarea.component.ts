import { Component, Input, OnInit } from '@angular/core';
import { SpService } from '../servicios/sp.service';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.component.html',
  styleUrls: ['./ver-tarea.component.css']
})
export class VerTareaComponent implements OnInit {

  @Input() tareas = [];

  constructor(public servicio: SpService) { }

  ngOnInit(): void {
  }

  guardarTareas() {
    let tareas: Object;
    let arr = []
    this.tareas.forEach(({descripcion, fechaEstimada:fecha_culminancion, estado}) => {
      tareas = {
        descripcion,
        fecha_culminancion,
        estado
      }
      this.servicio.agregarTareas(tareas).then(
        (respuesta) => {
          alert('Se creó correctamente');

        }
      ).catch(
        (err) => console.log('error al guardar tareas', err)
      )
    })
    console.log(arr)
  }

}
