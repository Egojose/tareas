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
}
