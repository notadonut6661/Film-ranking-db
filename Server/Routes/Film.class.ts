import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import Route from "./Route.class"


export class Film extends Route {

  protected routeName: string;

  constructor() {
    super();
    this.Get = this.Get.bind(this);
    this.routeName = "Film";
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    console.log(this);

    console.log(req.originalUrl);
    
    const { id } = this.getDecodedURI("GET", req.originalUrl);

    res.json(await (await dbConnection).query(`SELECT * FROM films WHERE id = ${id}`));
  }

  // TODO: if  request content type is not equal to application/json we should response with an error
  public Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(1);

  }

  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }

  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }



} 