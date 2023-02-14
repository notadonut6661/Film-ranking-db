export abstract class Request {
  protected url: string;

  abstract Send(params: object): void | unknown;
} 