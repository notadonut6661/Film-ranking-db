import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '@helpers/dbConnection';
import {Route} from "./Route.class"
import { UriDecoder } from "@helpers/uriDecoder";

export class Actors extends Route {

  protected routeName: string;
  protected dbName: string;
  protected uriDecoder: UriDecoder;

  constructor() {
    super();
    this.routeName = "actors";
    this.dbName = "actors";
    this.uriDecoder = new UriDecoder([{ name: 'title', type: 'string' }, { name: 'query', type: {Required: {id: "number"}}}]);
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void>  {
    try {
      const { query } = this.uriDecoder.Decode(req.originalUrl);
      
      if (typeof query === 'string') return;
      const ActorsUncutArr = await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE name LIKE "${query.name}%"`);
      res.json(ActorsUncutArr.slice(0, +query.length));

     } catch (err) {
      console.log(err);
      
      res.status(404).json({ Error: "Wrong parameters" });
    }
  }

  public Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }
  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }
  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }
} 

