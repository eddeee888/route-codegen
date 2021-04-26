import { throwError } from "../throwError";

export class BasePlugin<C, R> {
  config: C;

  constructor(config: C) {
    this.config = config;
  }

  generate(): R {
    return throwError([], "Implement generate function");
  }
}
