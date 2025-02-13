import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Movie, ResponseMovieJSON } from './movie-model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
   private readonly apiKey = 'USA_TU_API_KEY_AQUI';
   private readonly URL_MOVIES = 'https://www.omdbapi.com/?apikey=';
   private readonly http = inject(HttpClient);
   movieObservable$ = new BehaviorSubject<Movie[]>([]);


   getMovies(movie:string):Observable<Movie[]>{
    return this.http.get<ResponseMovieJSON>(`${this.URL_MOVIES}${this.apiKey}&s=${movie}`).pipe(
      map((data) => {
        
      // Handle empty or invalid responses
      if (data.Response === 'False' || !data.Search) {
        console.warn('No movies found or invalid response');
        this.setMovies([]);
        return []; // Return an empty array if no results are found
      }
      this.setMovies(data.Search);
      return data.Search;
    }),
    catchError((err) => {
      console.error('Error fetching movies:', err);
      this.setMovies([]);
      return of([]); // Return empty array in case of error
    })
    );
   }
  
   getMovieObservable():Observable<Movie[]>{
    return this.movieObservable$.asObservable();
  }

  setMovies(movies:Movie[]){
    this.movieObservable$.next(movies);
  }

}
