import { Request, Response } from "express";
import { RequestType } from "data/requestTypes.interface";
import { uriDecoder } from '../helpers/uriDecoder';
import { uriParamsType } from "../data/uriParamsTypes";

export default abstract class Route {

  protected abstract routeName:string;
  protected abstract dbName:string;
  protected readonly postRequestDataType: string | Array<string>;

  constructor() {
    this.postRequestDataType = 'application/json';
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