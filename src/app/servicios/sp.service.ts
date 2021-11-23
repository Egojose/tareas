import { Injectable } from '@angular/core';
import { sp } from "@pnp/sp/presets/all";
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
    .select('*', 'usuario/Title, usuario/EMail, usuario/Id', 'aprobador/Title, aprobador/EMail, aprobador/Id')
    .expand('usuario, aprobador').getAll();
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
}
