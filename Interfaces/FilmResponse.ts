import CastFilm from "./ActorFilm.interface";

export default interface FilmResponse {
  id: number;
  plot: string;
  title: string;
  cast: CastFilm[];
  rating: number;
  rating_quantity: number;
  page_watched: number;
  release_date: string;
}

