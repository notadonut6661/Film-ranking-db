import {Route} from "./Route.class";
import dbConnection from "../helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UriDecoder } from "../helpers/uriDecoder";

export class Users extends Route {
  protected routeName: string;
  protected dbName: string;
  protected uriDecoder: UriDecoder;

  constructor() {
    super();
    this.routeName = "users";
    this.uriDecoder = new UriDecoder([{name: "title", type:"string"}, {name: "id", type: "number"}]);
    this.dbName = "users";
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
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