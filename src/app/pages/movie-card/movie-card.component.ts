import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie-model';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
@Input({required:true}) movie?:Movie;
getUrlImg(){
  const url = this.movie?.Poster === 'N/A' 
   ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png'
   : this.movie?.Poster;
   return url;
}
//
}
