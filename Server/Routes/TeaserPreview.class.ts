import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Route } from "./Route.class";

class TeaserPreview extends Route {
  protected routeName: string;
  protected dbName: string;

  constructor() {
    super();
    this.routeName = "TeaserPreview";
    this.dbName = "TeaserPreview";
  }

  public Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    
  }
} 