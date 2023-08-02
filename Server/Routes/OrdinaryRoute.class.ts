import {Route} from "./Route.class";
import dbConnection from "helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UriDecoder } from "helpers/uriDecoder";


/**
 * OrdinaryRoute - takes in routeName and dbName, it's class with default http routes, implements 4 verbs, GET, POST, PATCH, DELETE, and does basic stuff with db at every request
 */
export class OrdinaryRoute<POST_REQ extends Request, PATCH_REQ extends Request>  extends Route {
  protected routeName: string;
  protected dbName: string;
  protected uriDecoder: UriDecoder;

  constructor (_routeName: string, _dbName: string) {
    super();
    this.routeName =  _routeName;
    this.dbName = _dbName;
    this.uriDecoder = new UriDecoder([{name: "title", type:"string"}, {name: "id", type: "number"}]);
  }
  
  public override async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response) {
    const { id } = this.uriDecoder.Decode(req.originalUrl);

    try {
      res.status(200).json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`));
    } catch {
      res.sendStatus(200);
    } 
  }

  public override async Post(req: POST_REQ, res: Response) {
    return new Promise((resolve: (value: string) => void, reject) => {
      setTimeout(() => resolve("0"), 100)
    })
  }

  public override async Patch(req: PATCH_REQ, res: Response) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(0), 100)
    })
  }
}