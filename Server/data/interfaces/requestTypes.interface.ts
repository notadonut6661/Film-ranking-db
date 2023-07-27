import { uriParamsType } from './uriParams.interface';

export interface RequestTypes {
  GET: Array<uriParamsType>;
  POST: Array<uriParamsType>;
  PATCH: Array<uriParamsType>;
  DELETE: Array<uriParamsType>;
}

export type HTTPVerb = "GET" | "POST" | "PATCH" | "DELETE";


