import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import Route from "./Route.class"
import { uriParamsType } from "data/interfaces/uriParams.interface";
import { userRecommendationManager } from '../helpers/userRecommendationManager';

export class Film extends Route {

  protected routeName: string;
  protected dbName: string;
  protected readonly dataType: uriParamsType[];

  constructor() {
    super();
    this.dataType = [{ name: 'title', type: 'string' }, { name: 'query', type: [{ name: "id", type: "number" }] }];
    this.routeName = "Film";
    this.dbName = "films";
  }

  public async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    try {
      const { query } = this.getDecodedURI("GET", req.originalUrl);
      if (typeof query === 'string') return;

      const userRecommendationManagerI = new userRecommendationManager(Number(query['id']));

      userRecommendationManagerI.createUserRecommendationsProfile([]);
      res.json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${query['id']}`));

    } catch {
      res.status(404).json({ Error: "Wrong parameters" });
    }


  }

  public async Post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    if (!req.is(this.MediaType)) {
      res.sendStatus(404);
      return;
    }

    // console.log(await this.Authorization(req));


    res.json(req.body);
  }

  public Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }

  public Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    console.log(2);

  }



} 