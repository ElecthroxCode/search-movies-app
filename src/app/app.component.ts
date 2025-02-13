import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { MovieCardComponent } from './pages/movie-card/movie-card.component';
import { MovieService } from './services/movie.service';
import { Movie } from './services/movie-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, MovieCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private readonly _movieService = inject(MovieService);

movies:Movie[] = [];
ngOnInit(): void {
 this._movieService.getMovieObservable().subscribe(
  {
    next: (data) => this.movies = data,
    error: (err) => console.log('error:', err)
  }
 );

}
}
