import ActorFilm from "./actorFilm.interface";

/* *
  * interface that describes server response to request film
*/
export interface Film {
  id: number;
  description: string;
  title: string;
  cast: ActorFilm[];
  rating: number;
  rating_quantity: number;
  duration: number;
  page_watched: number;
  release_date: string;   
}