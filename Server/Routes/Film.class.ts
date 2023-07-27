import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { Route } from "./Route.class"
import { UriDecoder } from "helpers/uriDecoder";

export class Film extends Route {

  protected routeName: string;
  protected dbName: string;
  protected readonly uriDecoder: UriDecoder;

  constructor() {
    super();
    this.uriDecoder = new UriDecoder([{name: "title", type:"string"}, {name: "id", type: "number"}]);
    this.routeName = "Film";
    this.dbName = "films";
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }

  public override Get = this.Response_GetById;

  public async Post(req: Request, res: Response): Promise<void> { 
    const data = req.body;

    res.send(data);
  }

  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }

  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }
} 