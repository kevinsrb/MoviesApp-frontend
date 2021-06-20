import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  selectedMovie: Movie;
  movies: Movie[];
  readonly URL_API = '/api/peliculas';

   
  
  constructor(private http: HttpClient) {
    this.selectedMovie = new Movie();
  }

  postMovie(movie: Movie) {
    return this.http.post(this.URL_API, movie);
  }

  getMovies() {
    return this.http.get<Movie[]>(this.URL_API)
  }

  updateMovie(movie: Movie) {
    return this.http.put(this.URL_API + `/${movie._id}`, movie);
  }

  deleteMovie(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
