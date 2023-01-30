# Rest API response example

## Cast interface

```ts
interface Cast {
  name: string;
  character: string;
  episodes_number: number; // Number of episodes actor was in
  episodes: Array<string> | Array<number>; // Array with either episode names or episode id's
}
```

```ts
interface CastFilm {
  name: string;
  character: string;
}
```

```ts
interface WatchOn {
  Megogo: string | null;
  Netflix: string | null;
  AppleTV: string | null;
  Hulu: string | null;
}
```

## Film

```ts
{
  "id": 954, 
  "description": "Film description",
  "title": "NAME", 
  "cast": CastFilm,
  "rating": 0, 
  "rating_quantity": 7, 
  "duration": 5880000, 
  "page_watched": number; 
  "release_date": "DD.MM.YYYY"
}
```

## Series

```ts
interface Series {
  id: number; // Id of film in the api db
  title: string;
  description: string;
  total_rating: number; // Average of all episode's rating
  cast: Cast;
  seasons_number: number; // Total quantity of all the seasons of the series that were released
  season_upcoming: number; // Quantity of upcoming seasons
  seasons_rating: number[]; // Average rating of all the episodes in season
  episodes_rating: number[][]; // Array contains arrays, every sub-array is a season and contains rating of episodes in this season.
  episodes_duration: number[][];
  episodes_names: string[][];
  average_episode_duration: number;
  page_watched: number; // Quantity of times this series's Family Film Rating page had been watched
  first_episode_release_date: `${number}.${number}.${number}`;
  last_episode_release_date: `${number}.${number}.${number}` | `Not ended`;
}
```

## Example film

```json
{
  "id": 954,
  "title": "Men in black",
  "rating": 6.5,
  "rating_quantity": 7,
  "duration": 5880000,
  "release_date": "02.07.1997"
}
```
