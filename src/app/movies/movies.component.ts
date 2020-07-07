import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../service/cinema.service';
import { MoviesService } from '../service/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies;
  movie;
  constructor(public moviesService: MoviesService,
              public cinemaService: CinemaService,
              public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.findAllMovies().subscribe(
      data =>{
        this.movies = data;
      }, error => {
        console.log(error);

      }
    )
  }

  onGetMovieDetails(id) {
    this.router.navigateByUrl(`movieDetails/${id}`)
  }

}
