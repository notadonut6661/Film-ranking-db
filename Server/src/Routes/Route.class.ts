import { Request, Response } from "express";
import { UriDecoder } from '../helpers/uriDecoder';
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { generateSha256 } from '../utils/generateSha256';

export abstract class Route {

  protected readonly abstract routeName: string;
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
  
  private getAuthHeader(req: Request) {
    return req.headers.authorization?.split(' ')[1];
  }
  
  protected ValidateRequest(req: Request): boolean {
    return Boolean(this.getAuthHeader(req)?.match(/^(\w|\d){3,15}:(\w|\W){6,30}$/));
  }

  protected async Authorization(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<boolean> {
    const authHeader = this.getAuthHeader(req);
    if (!this.ValidateRequest(req)) {
      return false;
    }

    const input = {
      email: authHeader?.split(':')[0],
      password: authHeader?.split(':')[1]
    }

    let realPass: string | undefined;

    try {
      realPass = await (await dbConnection).query(`SELECT password_hash FROM users WHERE email = ${input.email}`);
    } catch (err) {
      console.error(err);
      return false;
    }

    if (!realPass || !input.password) return false;

    return realPass === generateSha256(input.password);
  }
}
