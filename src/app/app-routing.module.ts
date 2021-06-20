import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { ClasificationComponent } from './components/clasification/clasification.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  { path: 'clasificacion', component: ClasificationComponent },
  { path: '', component: MovieComponent },
  //{ path: 'crear-producto', component: CrearProductoComponent },
  //{ path: 'editar-producto/:id', component: CrearProductoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
