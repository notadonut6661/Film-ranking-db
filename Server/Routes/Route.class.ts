import { Request, Response } from "express";
import { RequestType, RequestTypes } from "data/requestTypes.interface";
import { uriDecoder } from '../helpers/uriDecoder';

export default abstract class Route {
  public abstract Get(req: Request, res: Response): void;
  public abstract Post(req: Request, res: Response): void;
  public abstract Patch(req: Request, res: Response): void;
  public abstract Delete(req: Request, res: Response): void;
}