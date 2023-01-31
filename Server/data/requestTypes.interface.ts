import { uriParamsType } from './../data/uriParams.interface';

export interface RequestTypes {
  GET: Array<uriParamsType>;
  POST: Array<uriParamsType>;
  PATCH: Array<uriParamsType>;
  DELETE: Array<uriParamsType>;
}

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE"
}