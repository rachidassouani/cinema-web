import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../common/city';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = 'http://localhost:8080/cities';

  constructor(public http: HttpClient) { }

  saveCity(cityName) {
    return this.http.post(this.url, cityName);
  }

  findAll() {
    return this.http.get<getResponceCities>(this.url).pipe(
      map(response => response._embedded.cities)
    );
  }

  deleteCity(id) {
    if (confirm('are you sure ?')) {
      return this.http.delete(`${this.url}/${id}`);
    }
  }
  findCityById(id) {
    return this.http.get<City>(`${this.url}/${id}`);
  }

}
interface getResponceCities {
  _embedded: {
    cities: City[]
  }
}
