import { throwError } from "../throwError";
import { TemplateFile, GeneralPluginBaseConfig } from "../types";

export class BaseGeneralGenerator<C = Record<string, unknown>, L = Record<string, unknown>> {
  config: GeneralPluginBaseConfig & C;
  linkOptions: L | null = null;

  constructor(config: GeneralPluginBaseConfig & C) {
    this.config = config;
    this._parseLinkOptions();
  }

  generate(): TemplateFile[] {
    return throwError([], "Implement generate function");
  }

  protected _parseLinkOptions(): void {
    this.linkOptions = {} as L;
  }

  protected _getLinkOptions(): L {
    if (!this.linkOptions) {
      return throwError([], "LinkOptions uninitialised");
    }
    return this.linkOptions;
  }
}
