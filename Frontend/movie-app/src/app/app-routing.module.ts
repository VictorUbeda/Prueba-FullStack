import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' }, // Ruta por defecto
  { path: 'movies', component: MovieListComponent }, // Ruta para la lista de películas
  { path: 'movie/:id', component: MovieDetailComponent } // Ruta para los detalles de una película
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
