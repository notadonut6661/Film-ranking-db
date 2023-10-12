import {Route} from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UriDecoder } from "../helpers/uriDecoder";
import { uriParamsType } from "data/interfaces/uriParams.interface";
import { HTTPVerb } from "data/interfaces/requestTypes.interface";


/**
 * TemplateRoute - takes in routeName and dbName, it's class with default http routes, implements 4 verbs, GET, POST, PATCH, DELETE, and does basic stuff with db at every request
 */
export class TemplateRoute<POST_REQ extends Request, PATCH_REQ extends Request>  extends Route {
  protected routeName: string;
  protected dbName: string | Map<HTTPVerb, string>;
  protected uriDecoder: UriDecoder;
  protected requestType: Array<uriParamsType>;

  constructor (_routeName: string, _dbName: string, _query?:{ Required: Record<string, "string" | "number" | "bigint" | "boolean" | "symbol">, Optional?:  Record<string, { type: "string" | "number" | "bigint" | "boolean" | "symbol" } >}) {
    super();
    this.requestType =  [{name: "title", type:"string"}, {name: "query", type: _query ?? {Required:{"id": "number"}}}];
    this.routeName =  _routeName;
    this.dbName = _dbName;
    this.uriDecoder = new UriDecoder(this.requestType);
  }   
  
  public override async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response) {
    this.ValidateRequest(req);
    const { query } = this.uriDecoder.Decode(req.originalUrl); 
    const sqlQuery = `SELECT * FROM ${this.dbName} WHERE ${Object.entries(query).map(([key, value]) => {
      if (key.includes('_min')) {
        return `${key.slice(0, key.indexOf('_min'))} > ${value}`
      }

      if (key.includes('_max')) {
        return `${key.slice(0, key.indexOf('_min'))} < ${value}`
      }

      return `${key} = ${value}`    
    }).join(' AND ')}`; 

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
