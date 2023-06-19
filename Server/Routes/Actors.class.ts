import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import Route from "./Route.class"
import { uriParamsType } from "data/interfaces/uriParams.interface";

export class Actors extends Route {
  protected routeName: string;
  protected dbName: string;
  protected getQueryDataType: uriParamsType[]; 

}