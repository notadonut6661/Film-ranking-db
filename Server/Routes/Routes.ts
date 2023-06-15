import { ActorPhoto } from "./ActorPhoto.class";
import { Film } from "./Film.class";

export const Routes = [
  { name: 'film', method: (new Film()) },
  { name: 'actorPhoto', method: (new ActorPhoto())}
]