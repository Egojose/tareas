import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/usuario';
import { SpService } from '../servicios/sp.service';

@Component({
  selector: 'app-mis-pendientes',
  templateUrl: './mis-pendientes.component.html',
  styleUrls: ['./mis-pendientes.component.css']
})
export class MisPendientesComponent implements OnInit {

  tareas = [];
  idUsuario: number
  Aprobador: User;
  constructor(public router: Router, private route: ActivatedRoute, public servicio: SpService, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.idUsuario = +params['idUsuario'];
    });
    this.consultarTareasXusuario();
    this.Aprobador = JSON.parse(sessionStorage.getItem('aprobador'))
  }

  consultarTareasXusuario() {
    this.servicio.consultarTareasXusuario(this.idUsuario).then(
      (respuesta) => {
        this.tareas = respuesta;
      }
    )
  }

  verTarea(tarea: object) {
    console.log(tarea);

    let paramsUsuario = {
      'idTarea': tarea['Id'],
      'idUsuario': this.idUsuario
    }

    let paramasAprobador = {
      'idTarea': tarea['Id'],
      'idAprobador': this.Aprobador.id
    }

    let param = tarea['estado'] === 'pendiente' ? paramsUsuario : paramasAprobador;

    this.router.navigate(['/ver-mis-tareas'], {queryParams: param})
  }

  eliminar(idTarea: number, index: number) {
    this.servicio.eliminarTarea(idTarea).then(
      (res) => {
        this.showSuccess('La tarea se eliminó correctamente')
      }
    ).catch(
      (err) => {
        this.showError('No se pudo eliminar la tarea');
        console.log('error al eliminar tarea', err)
      }
    )
    this.tareas.splice(index, 1);
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
