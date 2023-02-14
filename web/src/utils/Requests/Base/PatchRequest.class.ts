import { Request } from "./Request.class";

export abstract class PatchRequest extends Request {
  abstract Send(params: object): {
    statusCode: number 
  };
}