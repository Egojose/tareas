import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { SpService } from './servicios/sp.service';

@NgModule({
  declarations: [
    AppComponent,
    CrearTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
