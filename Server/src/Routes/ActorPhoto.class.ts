import path from "path";
import {Route} from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UriDecoder } from "../helpers/uriDecoder";

export class ActorPhoto extends Route {

  protected routeName: string;
  protected dbName: string;
  protected readonly uriDecoder: UriDecoder;

  constructor() {
    super();
    this.uriDecoder = new UriDecoder([{ name: "title", type: "string"}, { name: "id", type: "number" }]);
    this.routeName = "ActorPhoto";
    this.dbName = "actors";
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response): Promise<void> {
    try {
      const { id } = this.uriDecoder.Decode(req.originalUrl);
      // const pathToProfilePhoto = (await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`))[0]?.profile_picture;

      // res.status(200).sendFile(path.resolve(pathToProfilePhoto));
    } catch {
      res.sendStatus(503);
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