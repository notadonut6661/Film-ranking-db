import { ActorPhoto } from './ActorPhoto.class';
import { Actors } from './Actors.class';
import { Auth } from './Auth.class';
import { TemplateRoute } from './TemplateRoute.class';
import { Route } from './Route.class';
import { Approve } from './Approve.class';
import { Factory } from 'src/helpers/Factory.interface';

export enum Routes {
  FILMS="FILMS",
  SERIES="SERIES", 
  AUTH="AUTH",
  ACTORS="ACTORS",
  ACTOR_PHOTO="ACTOR_PHOTO",
  USERS="USERS",
  APPROVE="APPROVE",
}

export class RouteFactory {
  /**
   * 
   * @param route - enum Routes
   * @returns an instance of the class inherited from class Route depending on input value.
   * @implements Factory method
   */

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
      
      case "APPROVE": 
        return new Approve();
        
      default: 
        throw new Error('');
    }
  }  
}
