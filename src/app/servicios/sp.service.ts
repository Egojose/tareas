import { Injectable } from '@angular/core';
import { sp } from "@pnp/sp/presets/all";
import { EINVAL } from 'constants';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpService {

  public obtenerConfiguracion() {
    const configuracionSharepoint = sp.configure({
        headers: {
            "Accept": "application/json; odata=verbose"
        }
    }, environment.urlWeb);

    return configuracionSharepoint;
}

  constructor() { }

  obtenerUsuarioActual() {
    let respuesta = from(this.obtenerConfiguracion().web.currentUser.get());
    return respuesta;
  }

  consultarUsuarios() {
    let respuesta = this.obtenerConfiguracion().web.lists
    .getByTitle(environment.listaUsuarios).items
    .select('*', 'usuario/Title, usuario/EMail, usuario/Id', 'aprobadores/Title, aprobadores/EMail, aprobadores/Id')
    .expand('usuario, aprobadores').getAll();
    return respuesta;
  }

  consultarAprobadores() {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaAprobadores).items.getAll();
    return respuesta;
  }

  consultarTareas() {
    let tareas = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaTareas)
    .items.select('*', 'responsable/Title, responsable/Email, responsable/Id').expand('responsable')
    .getAll();
    return tareas;
  }

  agregarTareas(tarea: Object) {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaTareas).items.add(tarea);
    return respuesta;
  } 

  consultarTareasXusuario(usuario:number) {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaTareas).items
    .select('*', 'aprobador/Title, aprobador/EMail, aprobador/Id')
    .expand('aprobador').filter("AuthorId eq " + usuario + "and completada eq 0").getAll();
    return respuesta;
  }

  actualizarTarea(id:number, tarea:object) {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaTareas).items.getById(id).update(tarea);
    return respuesta;
  }
}
