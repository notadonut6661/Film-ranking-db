import { ActorPhoto } from "./ActorPhoto.class";
import { Actors } from "./Actors.class";
import { Film } from "./Film.class";
import { Users } from "./Users.class";

export const Routes = [
  { name: 'film', method: (new Film()) },
  { name: 'actorPhoto', method: (new ActorPhoto())},
  { name: 'users', method: (new Users())},
  { name: 'actors', method: (new Actors())}
]