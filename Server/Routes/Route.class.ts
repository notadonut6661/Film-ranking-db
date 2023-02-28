import { Request, Response } from "express";
import { RequestType } from "data/interfaces/requestTypes.interface";
import { uriDecoder } from '../helpers/uriDecoder';
import { uriParamsType } from "../data/interfaces/uriParamsTypes";
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { generateSha256 } from '../utils/generateSha256';

export default abstract class Route {

  protected abstract routeName: string;
  protected abstract dbName: string;
  protected readonly postRequestDataType: string | Array<string>;

  constructor() {
    this.postRequestDataType = 'application/json';
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }

  private getAuthHeader(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    return req.headers.authorization?.split(' ')[1];
  }

  protected Validation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): boolean {
    const authHeader = this.getAuthHeader(req);

    console.log(!!authHeader?.match(/^(\w|\d){3,15}:(\w|\W){6,30}$/));
    return !!0;
  }

  protected async Authorization(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<boolean> {
    const authHeader = this.getAuthHeader(req);
    this.Validation(req);
    // FIXME validate with regex

    const input = {
      email: authHeader?.split(':')[0],
      password: authHeader?.split(':')[1]
    }

    let realPass: string | undefined;

    try {
      realPass = await (await dbConnection).query(`SELECT passwordHash FROM users WHERE email = ${input.email}`);
    } catch {
      return false;
    }

    if (!realPass || !input.password) return false;

    return realPass === generateSha256(input.password);
  }

  public abstract Get(req: Request, res: Response): void;
  public abstract Post(req: Request, res: Response): void;
  public abstract Patch(req: Request, res: Response): void;
  public abstract Delete(req: Request, res: Response): void;

  protected getDecodedURI(HTTPMethod: RequestType, uri: string) {

    const uriDecoderE = new uriDecoder(uriParamsType[this.routeName][HTTPMethod]);

    return uriDecoderE.Decode(uri);
  }
}