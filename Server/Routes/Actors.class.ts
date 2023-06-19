import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import Route from "./Route.class"
import { uriParamsType } from "data/interfaces/uriParams.interface";

export class Actors extends Route {

  protected routeName: string;
  protected dbName: string;
  protected getQueryDataType: uriParamsType[];

  constructor() {
    super();
    this.routeName = "actors";
    this.dbName = "actors";
    this.getQueryDataType = [{ name: 'title', type: 'string' }, { name: 'query', type: [{ name: "name", type: "string" }] }];
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void>  {
    try {
      const query = this.getDecodedURI("GET", req.originalUrl);
      // if (typeof query === 'string') return;
      // res.json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${query['id']}`));
      res.json(query);
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