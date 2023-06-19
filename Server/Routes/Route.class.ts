import { Request, Response } from "express";
import { RequestType } from "data/interfaces/requestTypes.interface";
import { uriDecoder } from '../helpers/uriDecoder';
import { uriParamsType } from "../data/interfaces/uriParams.interface";
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { generateSha256 } from '../utils/generateSha256';

export default abstract class Route {

  protected abstract routeName: string;
  protected abstract dbName: string;
  protected readonly MediaType: string;
  protected abstract readonly getQueryDataType: Array<uriParamsType>;

  constructor() {
    this.MediaType = 'application/json';
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }

  public abstract Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void;
  public abstract Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void;
  public abstract Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void;
  public abstract Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void;

  private getAuthHeader(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    return req.headers.authorization?.split(' ')[1];
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


  protected getDecodedURI(HTTPMethod: RequestType, uri: string) {
    console.log(this.getQueryDataType);
    
    const uriDecoderE = new uriDecoder(this.getQueryDataType);

    return uriDecoderE.Decode(uri);
  }
}