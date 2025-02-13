import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../services/movie-model';
import { debounceTime, distinct, distinctUntilChanged, EMPTY, filter, fromEvent, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit{
  
  
  private readonly _movieService = inject(MovieService);
  
  @ViewChild('movieSearchInput') movieSearchInput!:ElementRef;
  ngAfterViewInit(): void {
  
  fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
    debounceTime(500),
    map((event:Event) => {
      const searchMovie = (event.target as HTMLInputElement).value;
      return searchMovie;
    }),
    distinct(),
    filter((searchMovie:string) => {
      return searchMovie.length > 3
    }),

      switchMap((searchMovie:string) =>{
        if(searchMovie.trim() != ''){
          return this._movieService.getMovies(searchMovie);
        }
        return EMPTY;
      })
      
    ).subscribe(
    {
      next: () =>{
        
      },
      error: (err) => console.error('Error: ', err)
    }
  );
}



}
