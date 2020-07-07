import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';
import { Review } from '../common/review';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie;
  reviews;
  message;
  review: Review;
  constructor(public route: ActivatedRoute,
              public moviesService: MoviesService) { }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.params['id'];
    this.findMovieById(id);
    this.findReviewsByMovieId(id);
  }

  findMovieById(id) {
    this.moviesService.findMovieById(id).subscribe(
      data =>{
        this.movie = data;
      }, error => {
        console.log(error);

      }
    )
  }

  findReviewsByMovieId(id) {
    this.moviesService.findReviewsByMovieId(id).subscribe(
      data =>{
        this.reviews = data;
      }, error => {
        console.log(error);

      }
    )
  }

  onSaveReview(review) {
    if (this.review == undefined) {
      // save
      this.review = review;
    } else {
      // update
      this.review.message = this.message;
    }
    this.moviesService.saveReview(this.review, this.movie.id).subscribe(
      (data)=>{
        this.findReviewsByMovieId(this.movie.id);
      }, error => {
        console.log(error);
      }
    )
    this.review = undefined;
    this.message = '';
  }

  onUpdateReview(id) {
    this.moviesService.findReviewById(id).subscribe(
      (data)=>{
        this.review = data;
        this.message = data.message;
        // console.log(this.review);

      }, error => {
        console.log(error);
      }
    );
  }

  onDeleteReview(id) {
    if (confirm('are you sure to delete this comment?')) {
      this.moviesService.deleteReview(id).subscribe(
        (data)=>{
          this.findReviewsByMovieId(this.movie.id);
        }, error => {
          console.log(error);
        }
      )
    }
  }
}
