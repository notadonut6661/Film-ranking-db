import { Request } from "./Request.class";

export abstract class GetRequest extends Request {
  abstract Send(params: object): object;
}