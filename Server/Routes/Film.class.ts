import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import Route from "./Route.class"


export class Film extends Route {

  protected routeName: string;
  protected dbName: string;

  constructor() {
    super();

    this.routeName = "Film";
    this.dbName = "films";
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    
    const { id } = this.getDecodedURI("GET", req.originalUrl);

    try {
      res.json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`));
    } catch {
      res.sendStatus(200);
    }

  }

  public async Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    if (!req.is(this.MediaType)) {
      res.sendStatus(404);
      return;
    }

    console.log(await this.Authorization(req));

    res.json(req.body);
  }

  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }

  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }



} 