export abstract class Request {
  protected url: string;

  constructor(_url: string) {
    this.url = _url;
  }
} 