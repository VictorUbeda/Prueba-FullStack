import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number= 0; // Inicializar movieId al declarar
  movie: any;
  genres: { [id: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.loadMovieDetails();
    });
  }

  loadMovieDetails() {
    this.movieService.getMovieDetails(this.movieId)
      .subscribe(response => {
        this.movie = response;
      });
  }

  getGenres(): string {
    if (!this.movie || !this.movie.genres) {
      return '';
    }
  
    return this.movie.genres.map((genre: { id: number, name: string }) => genre.name).join(', ');
  }
}
