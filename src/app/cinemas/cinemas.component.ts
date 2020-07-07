import { Component, OnInit } from '@angular/core';
import { CinemasService } from '../service/cinemas.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  cities;
  cinemas;
  rooms;
  currentCity;
  currentCinema;
  currentProjection;
  selectedTickets: any[];
  constructor(public cinemasService: CinemasService) { }

  ngOnInit(): void {
    this.cinemasService.getAllCities().subscribe(
      (data)=>{
        this.cities = data;
      }, (error) =>{
        console.log(error);
      }
    );
  }
  onGetCinemas(city) {
    this.currentCity = city.name;
    this.rooms = undefined;
    this.cinemasService.getCinemas(city).subscribe(
      (data)=>{
        this.cinemas = data;
        console.log(this.cities);

      }, (error) =>{
        console.log(error);
      }
    );
  }
  onGetRooms(cinema) {
    this.currentCinema = cinema;
    this.cinemasService.getRooms(cinema).subscribe(
      (data)=>{
        this.rooms = data;
        this.rooms._embedded.rooms.forEach((room)=>{
          this.cinemasService.getProjections(room).subscribe(
            (data)=>{
              room.projections = data;
            }, (error) =>{
              console.log(error);
            }
          );
        });

      }, (error) =>{
        console.log(error);
      }
    );
  }
  onGetTicketsPlaces(p) {
    this.currentProjection = p;
    this.cinemasService.getTicketsPlaces(p).subscribe(
      (data)=>{
        this.currentProjection.tickets = data;
        this.selectedTickets = [];
      }, (error)=>{
        console.log(error);
      }
    );
  }
  onGetMovieDetails(room) {
    console.log('Im here!!');
    console.log(room);
  }
  onSelectTicket(t) {
    t.selected = !t.selected;
    if (t.selected)
      this.selectedTickets.push(t);
    else
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);

    console.log(this.selectedTickets);
  }
  getTicketClass(t) {
    let className = 'btn ';

    if (t.reserve)
      className += 'btn-danger';
    else if (t.selected)
      className += 'btn-warning';
    else
      className += 'btn-light';

    return className;
  }

  onPayTickets(f) {
    let tickets = [];
    this.selectedTickets.forEach(ticket => {
      tickets.push(ticket.id);
    });
    f.tickets = tickets;
    this.cinemasService.buyTickets(f).subscribe(
      (data) => {
        alert('Tickets has been reserved successfully');
        this.onGetTicketsPlaces(this.currentProjection);
      }, error => {

      }
    );

  }
}
