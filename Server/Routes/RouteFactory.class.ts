import { ActorPhoto } from './ActorPhoto.class';
import { Actors } from './Actors.class';
import { Auth } from './Auth.class';
import { TemplateRoute } from './TemplateRoute.class';
import { Route } from './Route.class';

// FIXME
export enum Routes {
  FILMS="FILMS",
  SERIES="SERIES", 
  AUTH="AUTH",
  ACTORS="ACTORS",
  ACTOR_PHOTO="ACTOR_PHOTO",
  USERS="USERS"
}

export class RouteFactory {
  static Create(route: Routes): Route | never {
    switch(route) {
      case "FILMS":
        return new TemplateRoute("films", "films");
      case "SERIES":  
        return new TemplateRoute("series", "series");
      case "AUTH": 
        return new Auth();
      case "ACTORS":
        return new Actors();
      case "ACTOR_PHOTO":
        return new ActorPhoto();
      case "USERS": 
        return new TemplateRoute("users", "users");
      
      default: 
        throw new Error('');
    }
  }  
}
