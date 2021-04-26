import { throwError } from "../throwError";
import { TemplateFile } from "../types";

class BasePlugin<C, R = TemplateFile> {
  config: C;

  constructor(config: C) {
    this.config = config;
  }

  generate(): R {
    return throwError([], "Implement generate function");
  }
}

export default BasePlugin;
