import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import {Route} from "./Route.class"
import { UriDecoder } from "../helpers/uriDecoder";

export class Approve extends Route {
  protected routeName: string;


  constructor() {
    super();
    this.routeName = "Approve";
  }

  

}