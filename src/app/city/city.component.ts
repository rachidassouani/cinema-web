import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city.service';
import { City } from '../common/city';
import { logging } from 'protractor';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cityName: string;
  cities: City[];
  city: City;
  search: string;
  constructor(public cityService: CityService) { }

  ngOnInit(): void {
    this.findAllCities();
  }

  onSaveCity(formData) {

    if (this.city == undefined) {
      // save
      this.city = formData;
    } else {
      // update
      this.city.name = this.cityName;

    }
    console.log(this.city);

    this.cityService.saveCity(this.city).subscribe(
      (response)=> {
        this.findAllCities()
        console.log(response);
      }, error =>{
        console.log(error);
      }
    );
    this.cityName = '';
    this.city = undefined;
  }
  findAllCities() {
    this.cityService.findAll().subscribe(
      data => {
        this.cities = data;
        // console.log(this.cities);

      }, error => {
        console.log(error);
      }
    )
  }

  onUpdateCity(id) {
    console.log(id);
    this.cityService.findCityById(id).subscribe(
      data => {
      this.city = data;
      this.cityName = this.city.name;
      }, error => {
        console.log(error);

      });

  }
  onDeleteCity(id) {
    this.cityService.deleteCity(id).subscribe(
      response => {
        this.findAllCities();
      }, error => {
        console.log(error);

      }
    );
  }

  // onSearch() {
  //   if (this.search != '') {
  //     let allSearchingCities = [];
  //     if (this.cities.length==0) {
  //       this.findAllCities();
  //     }

  //     this.cities.forEach(city => {
  //     if(city.name == this.search) {
  //         allSearchingCities.push(city);
  //       }
  //       this.cities = allSearchingCities;
  //     })
  //     } else {
  //     this.findAllCities();
  //   }

  // }
  onSearch() {
    console.log(this.cities);
    let cityObj = this.cities.find(city => city.name === this.search)
    if (cityObj) {
      this.cities = [];
      this.cities.push(cityObj);
    }
  }


}










