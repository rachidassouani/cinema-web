import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from '../common/city';
import { Cinema } from '../common/cinema';
import { CinemaService } from '../service/cinema.service';
import { CityService } from '../service/city.service';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-cinema-detail',
  templateUrl: './cinema-detail.component.html',
  styleUrls: ['./cinema-detail.component.css']
})
export class CinemaDetailComponent implements OnInit {

  cinemaId: number;
  cityId: number;
  city: City;
  cinema: Cinema;
  countRoom;

  constructor(public route: ActivatedRoute,
              public cinemaService: CinemaService,
              public cityService: CityService,
              public roomService: RoomService) { }

  ngOnInit(): void {
    this.getCinemaInfos();
  }

  getCinemaInfos() {
    this.cinemaId = this.route.snapshot.params['id'];
    this.cityId = this.route.snapshot.params['cityId'];

    // get city by it's id
    this.cityService.findCityById(this.cityId).subscribe(
      data => {
        this.city = data;
      }
    );
    this.cinemaService.findCinemaById(this.cinemaId).subscribe(
      data => {
        this.cinema = data;
        this.countRoom = data.countRooms;
      }
    )
    this.getCountRooms();


  }

  getCountRooms() {
    this.roomService.getCountRoom(this.cinemaId).subscribe(
      data => {
        this.countRoom = data;
       }
    );
  }

  onSaveRoom(formData) {
    // console.log(formData);

    this.roomService.saveRoomInCinemaDetail(formData, this.cinemaId).subscribe(
      data => {
        alert('Room has been added succeessfully')
        console.log(data);


      }, error => {
        console.log(error);
      }
    );
      this.getCountRooms();
  }
}
