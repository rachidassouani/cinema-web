import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CinemaComponent } from './cinema/cinema.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { from } from 'rxjs';
import { CityComponent } from './city/city.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { RoomComponent } from './room/room.component';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    NavbarComponent,
    MovieDetailsComponent,
    MoviesComponent,
    CityComponent,
    CinemasComponent,
    RoomComponent,
    CinemaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
