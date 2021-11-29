import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmailProperties } from '@pnp/sp/sputilities';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/usuario';
import { SpService } from '../servicios/sp.service';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.component.html',
  styleUrls: ['./ver-tarea.component.css']
})
export class VerTareaComponent implements OnInit {

  @Input() tareas = [];
  @Input() esSolicitante: boolean;
  usuario: User;
  tareasPendientes = [];
  idUsuario: number;
  aprobador: User
  idTarea: number;
  habilitarBtn: boolean;
  idAprobador: number;
  tareaXaprobar: any;
  mostrarBtn = true;
  

  constructor(public servicio: SpService,  public toaster: ToastrService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if(params['idUsuario']) this.idUsuario = +params['idUsuario'];
      if(params['idTarea']) this.idTarea = +params['idTarea']
      if(params['idAprobador']) this.idAprobador = +params['idAprobador']
    });

    this.aprobador = JSON.parse(sessionStorage.getItem('aprobador'))
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(this.idUsuario) {
      this.habilitarBtn = true;
      this.mostrarBtn = false
    }

    if(this.idAprobador) {
      this.habilitarBtn = false;
    }

    if(this.idTarea) {
      this.consultarTareaXid();
    }

    this.esSolicitante = this.idAprobador ? false : true; 
  }

  consultarTareaXid() {
    this.servicio.consultarTareaXid(this.idTarea).then(
      (res) => {
        this.tareas.push(res);
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
        this.enviarNotificacion(this.aprobador.email)
      }
    ).catch(
      (err) => {
        this.showError('No se pudo actualizar la tarea');
        console.log('actualizar tarea', err)
      }
    );
    this.router.navigate(['/'])
  }

  aprobar() {
    if(this.idAprobador !== this.idUsuario) {
      this.showWarning('Usted no puede aprobar esta tarea');
      return;
    }
    let tarea = {
      estado: 'Aprobada',
      completada: true
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
    this.router.navigate(['/'])
  }

  async enviarNotificacion(emailAprobador) {
    const emailProps: IEmailProperties = {
      To: [emailAprobador],
      Subject: "Nueva tarea",
      Body: `El usuario ${this.usuario.name} ha creado una tarea que requiere de su aprobación.`
    };
    await this.servicio.enviarCorreo(emailProps).then(
      (respuesta) => {
        this.showInfo('Se envió una notificación al responsable')
      }
    ).catch(
      (err) => {
        this.showError('No se pudo enviar la notificación responsable')
        console.log('Notificación', err)
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
