import { uriParamsType } from './uriParams.interface';

export interface RequestTypes {
  GET: Array<uriParamsType>;
  POST: Array<uriParamsType>;
  PATCH: Array<uriParamsType>;
  DELETE: Array<uriParamsType>;
}

export type RequestType = "GET" | "POST" | "PATCH" | "DELETE";


