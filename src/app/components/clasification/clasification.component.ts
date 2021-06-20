import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from "@angular/forms";
import { Clasification } from 'src/app/models/clasification';
import { ClasificationService } from 'src/app/services/clasification.service'; 
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-clasification',
  templateUrl: './clasification.component.html',
  styleUrls: ['./clasification.component.css'],
  providers: [ClasificationService, MovieService],
})
export class ClasificationComponent implements OnInit {
  constructor(public clasificationService: ClasificationService,
              public movieService: MovieService,
              private toastr: ToastrService) { }


  clasificacionPelicula;

  ngOnInit(): void {
    this.getClasifications();
    this.getMovies()
  }

  saveClasification(form?: NgForm) {
    if (form.value._id) {
      this.clasificationService.updateClasification(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getClasifications();
      });
    } else {
      delete form.value["_id"];
      this.clasificationService.postClasification(form.value).subscribe((res) => {
        this.getClasifications();
        this.resetForm(form);
      });
    }
  }


  getClasifications() {
    this.clasificationService.getClasifications().subscribe((res) => {
      this.clasificationService.clasifications = res;
    });
  }

  updateClasification(clasification: Clasification) {
    this.clasificationService.selectedClasification = clasification;
  }

  deleteClasification(_id: string, form: NgForm) {
    
    this.clasificacionPelicula = this.movieService.movies.find(element => element.clasification["_id"] == _id);
    if(this.clasificacionPelicula != undefined){
      alert('No se puede eliminar la clasificacion debido a que esta asociada a una o mas peliculas')
    }else{
      if (confirm("¿Estás segura de que quieres eliminarlo?")) {
        this.clasificationService.deleteClasification(_id).subscribe((res) => {
          this.getClasifications();
          this.resetForm(form);
        });
      }
    }
    
  }

  getMovies() {
    this.movieService.getMovies().subscribe((res) => {
      this.movieService.movies = res;
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.clasificationService.selectedClasification = new Clasification();
    }
  }


}
