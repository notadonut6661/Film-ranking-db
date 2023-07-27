import { Request, Response } from "express";
import { UriDecoder } from '../helpers/uriDecoder';
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { generateSha256 } from '../utils/generateSha256';

export abstract class Route {

  protected readonly abstract routeName: string;
  protected readonly abstract dbName: string;
  protected readonly MediaType: string;
  protected uriDecoder: UriDecoder | null;
  
  constructor() {
    this.MediaType = 'application/json';
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
    this.uriDecoder = null;
  }
  
  public Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    res.status(404).send("Not Implemented");
  } 


  public Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    res.status(404).send("Not Implemented");
  }
  
  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    res.status(404).send("Not Implemented");
  }

  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    res.status(404).send("Not Implemented");
  }
  
  private getAuthHeader(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    return req.headers.authorization?.split(' ')[1];
  }

  protected async Response_GetById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
      const { id } = this.uriDecoder.Decode(req.originalUrl);
  
      try {
        res.status(200).json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`));
      } catch {
        res.sendStatus(200);
      } 
  }
  
  protected Validation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): boolean {

    let doesRequestBodyRequiresPattern: boolean;

    if (!this.getAuthHeader(req)?.match(/^(\w|\d){3,15}:(\w|\W){6,30}$/)) {
      return false;
    }

    if (typeof req.body != "object") {
      return false;
    }

    return true;
  }

  protected async Authorization(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<boolean> {
    const authHeader = this.getAuthHeader(req);
    if (!this.Validation(req)) {
      return false;
    }

    const input = {
      email: authHeader?.split(':')[0],
      password: authHeader?.split(':')[1]
    }

    console.log(input);

    let realPass: string | undefined;

    try {
      realPass = await (await dbConnection).query(`SELECT passwordHash FROM users WHERE email = ${input.email}`);
    } catch {
      return false;
    }

    if (!realPass || !input.password) return false;

    return realPass === generateSha256(input.password);
  }
}