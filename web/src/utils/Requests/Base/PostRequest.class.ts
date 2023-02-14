import { Request } from "./Request.class";

export abstract class PostRequest extends Request {

  abstract Send(params: object): void;
}
