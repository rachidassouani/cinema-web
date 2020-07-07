import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../common/movie';
import { map } from 'rxjs/operators';
import { Review } from '../common/review';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  host: string = 'http://localhost:8080/movies';
  urlReviews: string = 'http://localhost:8080/reviews';

  findAllMovies() {
    return this.http.get<getResponseMovies>(this.host).pipe(
      map(response => response._embedded.movies)
    );
  }
  findMovieById(id) {
    return this.http.get<Movie>(`${this.host}/${id}`);
  }

  findReviewsByMovieId(id: any) {
    return this.http.get<getResponseReviews>(`${this.host}/${id}/reviews`).pipe(
      map(response => response._embedded.reviews)
    )
  }
  deleteReview(id) {
    const url = `${this.urlReviews}/${id}`;
    return this.http.delete(`${url}`);
  }



  saveReview(review, id) {
    // let url: string = 'http://localhost:8080/reviews';

    // if (review.id) {
    //   // update

    // } else {
    //   // save
    //   review.movie = `${this.host}/${id}`;
    //   return this.http.post(this.urlReviews, review);
    // }
    review.movie = `${this.host}/${id}`;
    return this.http.post(this.urlReviews, review);
  }

  findReviewById(id: any) {
    return this.http.get<Review>(`${this.urlReviews}/${id}`);
  }
}
interface getResponseMovies {
  _embedded : {
    movies: Movie[]
  }
}

interface getResponseReviews {
  _embedded : {
    reviews: Review[]
  }
}
