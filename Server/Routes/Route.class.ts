import { Request, Response } from "express";
import { RequestType } from "data/interfaces/requestTypes.interface";
import { uriDecoder } from '../helpers/uriDecoder';
import { uriParamsType } from "../data/interfaces/uriParamsTypes";
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

export default abstract class Route {

  protected abstract routeName:string;
  protected abstract dbName:string;
  protected readonly postRequestDataType: string | Array<string>;

  constructor() {
    this.postRequestDataType = 'application/json';
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }
  
  protected Authorization(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): string | undefined {
    return req.headers.authorization?.split(' ')[1];
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