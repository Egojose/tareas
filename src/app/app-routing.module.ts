import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { VerTareaComponent } from './ver-tarea/ver-tarea.component';


const routes: Routes = [
  {path: 'crear-tarea', component: CrearTareaComponent},
  {path: 'ver-mis-tareas', component: VerTareaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
