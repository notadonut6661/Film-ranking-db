import Route from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { uriParamsType } from "data/interfaces/uriParams.interface";
import { uriDecoder } from "../helpers/uriDecoder";

export class Users extends Route {
  protected routeName: string;
  protected dbName: string;
  protected getQueryDataType: uriParamsType[];

  constructor() {
    super();
    this.routeName = "users";
    this.getQueryDataType  = [{name: "title", type:"string"}, {name: "id", type: "number"}];
    this.dbName = "users";
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }
  
  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const { id } = this.getDecodedURI("GET", req.originalUrl);
    try {
      res.status(200).json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`));
    } catch {
      res.sendStatus(200);
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