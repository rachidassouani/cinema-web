import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  host: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }


  getAllCities() {
    return this.http.get(`${this.host}cities`);
  }
  getCinemas(city) {
    return this.http.get(city._links.cinemas.href);
  }
}
