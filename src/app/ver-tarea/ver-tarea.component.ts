import { CompileMetadataResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpService } from '../servicios/sp.service';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.component.html',
  styleUrls: ['./ver-tarea.component.css']
})
export class VerTareaComponent implements OnInit {

  @Input() tareas = [];
  @Input() esSolicitante: boolean;
  usuario;
  tareasPendientes = [];
  idUsuario: number;
  aprobador: {}
  idTarea: number;
  habilitarBtn: boolean;
  idAprobador: number;
  

  constructor(public servicio: SpService,  public toaster: ToastrService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.idUsuario = +params['id'];
      this.idTarea = +params['idTarea']
      this.idAprobador = +params['idAprobador']
    });
    if(this.idUsuario) {
      this.consultarTareas();
      this.habilitarBtn = true;
    }

    this.esSolicitante = this.idAprobador ? false : true; 
  }

  consultarTareas() {
    this.servicio.consultarTareasXusuario(this.idUsuario).then(
      (respuesta) => {
        this.tareas = respuesta;
        // console.log(this.tareasPendientes);
      }
    )
  }

  guardarTareas() {
    let tareas: Object;
    let arr = [];
    this.tareas.forEach(({descripcion, fechaEstimada:fecha_culminancion, estado, responsableId, aprobadorId}) => {
      tareas = {
        descripcion,
        fecha_culminancion,
        estado,
        responsableId,
        aprobadorId
      }
      console.log(tareas)
      this.servicio.agregarTareas(tareas).then(
        (respuesta) => {
          this.showSuccess('Las teareas se guardaron correctamente')
        }
      ).catch(
        (err) => {
          console.log('error al guardar tareas', err);
          this.showError('Hubo un error al intentar guardar las tareas');
        }
      )
    }) 
    
  }

  completar() {
    let tarea = {
      estado: 'Completada',
      responsableId: this.aprobador['id']
    }
    this.servicio.actualizarTarea(this.idTarea, tarea).then(
      (res) => {
        this.showSuccess('La tarea se actualizó correctamente');
      }
    ).catch(
      (err) => {
        this.showError('No se pudo actualizar la tarea');
        console.log('actualizar tarea', err)
      }
    )
  }


  showSuccess(mensaje:string) {
    this.toaster.success(mensaje, 'Correcto')
  }

  showWarning(mensaje: string) {
    this.toaster.warning(mensaje, 'Cuidado')
  }

  showError(mensaje: string) {
    this.toaster.error(mensaje, 'Error')
  }

  showInfo(mensaje: string) {
    this.toaster.info(mensaje, 'Información')
  }



}
