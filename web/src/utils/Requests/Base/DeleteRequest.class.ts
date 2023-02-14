import { Request } from "./Request.class";
import { StatusCodes } from 'http-status-codes';

export abstract class DeleteRequest extends Request {
  abstract Send(params: object): {
    statusCode: StatusCodes 
  };
}