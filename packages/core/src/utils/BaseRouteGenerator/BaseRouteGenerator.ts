import { throwError } from "../throwError";
import { TemplateFile, GeneralPluginBaseConfig, WithExtraConfig } from "../types";

export class BaseRouteGenerator<L = Record<string, unknown>, C = Record<string, unknown>> {
  config: WithExtraConfig<GeneralPluginBaseConfig, C>;
  linkOptions: L | null = null;

  constructor(config: WithExtraConfig<GeneralPluginBaseConfig, C>) {
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
