# Rest API response example

## Cast interface

```ts
interface Cast {
  name: string;
  character: string;
  episodes_number: number; // Anzahl der Episoden, in denen der Schauspieler mitgewirkt hat
  episodes: Array<string> | Array<number>; // Array mit entweder Episodennamen oder Episoden-IDs
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
  id: number; 
  title: string;
  description: string;
  rating: number; // Durchschnitt aller Episodenbewertungen
  cast: Cast;
  seasons_number: number;
  seasons_ratings: number[]; // Durchschnittliche Bewertung aller Episoden der Staffel
  episodes_rating: number[][];
  episodes_duration: number[][];
  episodes_names: string[][];
  average_episode_duration: number;
  page_watched: number;
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
  "release_date": "02.07.1997"
}
```
