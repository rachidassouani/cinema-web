import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { CinemaComponent } from './cinema/cinema.component';
import { CityComponent } from './city/city.component';
import { RoomComponent } from './room/room.component';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';
// import { CinemasComponent } from './cinema/cinema.component';


const routes: Routes = [
  {path: 'admin/cinema', component: CinemaComponent  },
  {path: 'admin/cinema-detail/:id/:cityId', component: CinemaDetailComponent  },
  {path: 'admin/city', component: CityComponent  },
  {path: 'admin/room', component: RoomComponent  },

  {path: 'cinemas', component: CinemasComponent  },
  {path: 'movieDetails/:id', component: MovieDetailsComponent},
  {path: 'movies', component: MoviesComponent},


  {path: '', redirectTo: 'cinemas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
