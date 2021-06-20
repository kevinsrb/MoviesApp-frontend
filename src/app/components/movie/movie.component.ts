import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from "@angular/forms";
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service'; 
import { ClasificationService } from 'src/app/services/clasification.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieService, ClasificationService]
})
export class MovieComponent implements OnInit {

  constructor(public movieService: MovieService, 
              public clasificationService: ClasificationService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getClasifications();
  }

  

  
  saveMovie(form?: NgForm) {
    if (form.value._id) {
      this.movieService.updateMovie(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getMovies();
      });
    } else {
      delete form.value["_id"];
      this.movieService.postMovie(form.value).subscribe((res) => {
        this.getMovies();
        this.resetForm(form);
      });
    }
  }

  getMovies() {
    this.movieService.getMovies().subscribe((res) => {
      this.movieService.movies = res;
    });
  }

  updateMovie(movie: Movie) {
    console.log(movie)
    this.movieService.selectedMovie = movie;
    
  }

  deleteMovie(_id: string, form: NgForm) {
    if (confirm("¿Estás segura de que quieres eliminarlo?")) {
      this.movieService.deleteMovie(_id).subscribe((res) => {
        this.getMovies();
        this.resetForm(form);
      });
    }
  }

  getClasifications() {
    this.clasificationService.getClasifications().subscribe((res) => {
      this.clasificationService.clasifications = res;
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.movieService.selectedMovie = new Movie();
    }
  }

}
