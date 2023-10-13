import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { Route } from "./Route.class"
import { UriDecoder } from "../helpers/uriDecoder";

enum SupportedServices {
  HULU, AMAZON, MEGOGO, NETFLIX
}

type Title = {
  title: string;
  durationMin: number;
  release_date: Date;
  cast: Map<string, {
    actorId: number,
    episodePresence?: number
  }>;
  services: Map<SupportedServices, string>;
  genres: Array<string>;
  tags: Array<string>;
}

export class Approve extends Route {
  protected routeName: string;

  constructor() {
    super();
    this.routeName = "Approve";
  }

  public Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {

  }

  public Post(req: Request<ParamsDictionary, Title, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    
  }

}