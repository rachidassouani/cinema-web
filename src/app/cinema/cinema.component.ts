import { Component, OnInit } from '@angular/core';
import { CityComponent } from '../city/city.component';
import { CityService } from '../service/city.service';
import { City } from '../common/city';
import { Cinema } from '../common/cinema';
import { CinemaService } from '../service/cinema.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemaName;
  cinemas: Cinema[];
  cinema: Cinema;
  city: City;
  cityId: number;
  cities: City[];
  search;
  currentCity: City;
  selectedCity
  constructor(public cityService: CityService,
              public cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.findAllCities();
  }

  findAllCities() {
    this.cityService.findAll().subscribe(
      data => {
        this.cities = data;
      }, error => {
        console.log(error);

      }
    );
  }

  onSaveCinema(dataForm: Cinema) {
    console.log(dataForm);
    this.cinemaService.saveCinema(dataForm).subscribe(
      data => {
        console.log(data);
        alert('cinema has been added successfully');
      }, error => {
        console.log(error);

      }
    );
  }

  onSearchChange(event) {
    this.cityId = event.target.value;
    this.cinemaService.findCinemasByCityId(this.cityId).subscribe(
      data => {
        console.log(data);
        this.cinemas = data;
      }, error => {
        console.log(error);
      }
    );
    this.cityService.findCityById(this.cityId).subscribe(
      data => {
        console.log(data);
        this.city = data;
      }, error => {
        console.log(error);
      }
    );
  }

  onSearch() {

  }
  onUpdateCinema(id) {

  }
  onDeleteCinema(id) {
    this.cinemaService.deleteCinema(id, this.city).subscribe(
      data => {
        this.cinemaService.findCinemasByCityId(this.cityId).subscribe(
          data => {
            console.log(data);
            this.cinemas = data;
          }, error => {
            console.log(error);
          }
        );
      }, error => {
        console.log(error);
      }
    );
  }
}
