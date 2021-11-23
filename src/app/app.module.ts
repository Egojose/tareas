import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { SpService } from './servicios/sp.service';
import { NavbarComponent } from './navbar/navbar.component';
import { VerTareaComponent } from './ver-tarea/ver-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CrearTareaComponent,
    NavbarComponent,
    VerTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
