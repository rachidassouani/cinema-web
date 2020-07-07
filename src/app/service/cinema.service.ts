import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cinema } from '../common/cinema';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  url = `http://localhost:8080/cinemas`;
  constructor(public http: HttpClient) { }

  saveCinema(cinema: Cinema) {
    const myCinema = {
      name: cinema.name,
      address: cinema.address,
      countRooms: cinema.countRooms,
      city: `http://localhost:8080/cities/${cinema.city.id}`
    }
    return this.http.post(this.url, myCinema);
  }

  findCinemasByCityId(id) {
    // let url = 'http://localhost:8080/cinemas/search/findByCityId?id=1';
    return this.http.get<onGetResponseCinemas>(`${this.url}/search/findByCityId?id=${id}`)
        .pipe(
          map( response=> response._embedded.cinemas)
        );
  }

  deleteCinema(id, city) {
    const urlForDeleteCinema = `http://localhost:8080/deleteCinemas/${id}/${city.id}`;
    return this.http.delete(`${urlForDeleteCinema}`);
  }


  findCinemaById(id) {
    return this.http.get<Cinema>(`${this.url}/${id}`);
  }
}

interface onGetResponseCinemas {
  _embedded: {
    cinemas: Cinema[]
  }
}
