import { UriDecoder } from 'helpers/uriDecoder';
import {Route} from "./Route.class";
import dbConnection from "helpers/dbConnection";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { uriParamsType } from "data/interfaces/uriParams.interface";

export class Auth extends Route {
  protected routeName: string;
  protected dbName: string;

  constructor() {
    super();
    this.routeName = "auth";
    this.dbName = "users";
  }

  public Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    
  }

  public Signup(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(11);
    res.status(200).send('20');
  }
  
  public Login(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    throw new Error("Method not implemented.");
  }

}