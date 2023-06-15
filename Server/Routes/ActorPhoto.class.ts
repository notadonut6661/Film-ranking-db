import path from "path";
import Route from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { uriParamsType } from "data/interfaces/uriParams.interface";
import { uriDecoder } from "helpers/uriDecoder";

export class ActorPhoto extends Route {

  protected routeName: string;
  protected dbName: string;
  protected readonly dataType: uriParamsType[];

  constructor() {
    super();
    this.dataType = [{name: "title", type:"string"}, {name: "id", type: "number"}];
    this.routeName = "ActorPhoto";
    this.dbName = "actors";
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const { id } = this.getDecodedURI("GET", req.originalUrl);
    try {
      res.status(200).sendFile((await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`))[0].profile_picture);
    } catch {
      res.sendStatus(404);
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