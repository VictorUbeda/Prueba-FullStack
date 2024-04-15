import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {
  query: string = ''; // Variable para almacenar la consulta de búsqueda
  movies: any[] = []; // Array para almacenar los resultados de la búsqueda

  constructor(private movieService: MovieService) {}

  searchMovies(): void {
    if (this.query.trim() !== '') {
      this.movieService.searchMovies(this.query)
        .subscribe(response => {
          this.movies = response.results;
        });
    }
  }
}

