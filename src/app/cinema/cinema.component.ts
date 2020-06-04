import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CinemaService } from '../service/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cities;
  cinemas;
  currentCity;
  currentCinema;
  constructor(public cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getAllCities().subscribe(
      (data)=>{
        this.cities = data;
        console.log(this.cities);

      }, (error) =>{
        console.log(error);
      }
    );
  }
  onGetCinemas(city) {
    this.currentCity = city.name;
    console.log(this.currentCity);

    this.cinemaService.getCinemas(city).subscribe(
      (data)=>{
        this.cinemas = data;
        console.log(this.cities);

      }, (error) =>{
        console.log(error);
      }
    );
  }
}
