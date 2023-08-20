import { ActorPhoto } from './ActorPhoto.class';
import { Actors } from './Actors.class';
import { Auth } from './Auth.class';
import { OrdinaryRoute } from './OrdinaryRoute.class';
import { Route } from './Route.class';

// FIXME
export enum Routes {
  FILM="FILM",
  SERIES="SERIES", 
  AUTH="AUTH",
  ACTORS="ACTORS",
  ACTOR_PHOTO="ACTOR_PHOTO",
  USERS="USERS"
}

export class RouteFactory {
  static Create(route: Routes): Route | never {
    switch(route) {
      case "FILM":
        return new OrdinaryRoute("film", "film");
      case "SERIES":  
        return new OrdinaryRoute("series", "series");
      case "AUTH": 
        return new Auth();
      case "ACTORS":
        return new Actors();
      case "ACTOR_PHOTO":
        return new ActorPhoto();
      case "USERS": 
        return new OrdinaryRoute("users", "users");
      
      default: 
        throw new Error('');
    }
  }  
}
