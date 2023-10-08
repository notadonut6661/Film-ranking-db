import {Route} from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UriDecoder } from "../helpers/uriDecoder";
import { uriParamsType } from "data/interfaces/uriParams.interface";


/**
 * OrdinaryRoute - takes in routeName and dbName, it's class with default http routes, implements 4 verbs, GET, POST, PATCH, DELETE, and does basic stuff with db at every request
 */
export class TemplateRoute<POST_REQ extends Request, PATCH_REQ extends Request>  extends Route {
  protected routeName: string;
  protected dbName: string;
  protected uriDecoder: UriDecoder;
  protected requestType: Array<uriParamsType>;

  constructor (_routeName: string, _dbName: string, _uriDecoder?: Array<uriParamsType>) {
    super();
    this.requestType = _uriDecoder ?? [{name: "title", type:"string"}, {name: "query", type: {Required:{"id": "string"}}}];
    this.routeName =  _routeName;
    this.dbName = _dbName;
    this.uriDecoder = new UriDecoder(this.requestType);
  }   
  
  public override async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response) {
    this.ValidateRequest(req);
    const { id, query } = this.uriDecoder.Decode(req.originalUrl); 
    const sqlQuery = `SELECT * FROM ${this.dbName} ${Object.entries(query).map(([key, value]) => `${key} = ${value}`).join(' ')}`; 

    try {
      res.status(200).json(await (await dbConnection).query(sqlQuery));
    } catch {
      res.sendStatus(200);
    } 
  }

  public override async Post(req: POST_REQ, res: Response) {
    console.log("fff");
    res.json({"ff": "ff"});
  }

  public override async Patch(req: PATCH_REQ, res: Response) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(0), 100)
    })
  }
}
