import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  host: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }


  getAllCities() {
    return this.http.get(`${this.host}cities`);
  }
  getCinemas(city) {
    return this.http.get(city._links.cinemas.href);
  }
  getRooms(cinema) {
    return this.http.get(cinema._links.rooms.href);
  }
  getProjections(room) {
    let url = room._links.projectionMovies.href.replace('{?projection}', '');
    return this.http.get(url+'?projection=p1');
  }
  getTicketsPlaces(p) {
    let url = p._links.tickets.href.replace('{?projection}', '');
    return this.http.get(url+'?projection=ticketProj');
  }

  buyTickets(f: any) {
    const url = `${this.host}/buyTickets`
    return this.http.post(url, f);
  }
}
