import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../common/room';
import { CinemaService } from './cinema.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomUrl: string = 'http://localhost:8080/rooms';
  cinemaUrl: string = 'http://localhost:8080/cinemas';

  constructor(public http: HttpClient,
              public cinemaService: CinemaService) { }

  saveRoom(room: Room) {
    const myRoom = {
      name: room.name,
      countSeats: room.countSeats,
      cinema: `${this.cinemaUrl}/${room.cinema}`
    }
    return this.http.post(`${this.roomUrl}`, myRoom);
  }
  saveRoomInCinemaDetail(formData, cinemaId) {
    formData.cinema = {cinema: `${this.cinemaUrl}/${cinemaId}`};

    return this.http.post(`${this.roomUrl}`, formData);
  }

  getCountRoom(cinemaId) {
    const url = `${this.roomUrl}/search/countByCinemaId?cinemaId=${cinemaId}`
    return this.http.get(url);
  }
}
