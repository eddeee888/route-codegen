import { throwError } from "../throwError";
import { Import, LinkOptions, PatternNamedExports, TemplateFile, TopLevelGenerateOptions } from "../types";

export interface BasePluginConfig {
  appName: string;
  routeName: string;
  routePattern: string;
  routeLinkOptions: LinkOptions;
  topLevelGenerateOptions: TopLevelGenerateOptions;
  destinationDir: string;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

export class BasePlugin<L = Record<string, unknown>, C = BasePluginConfig, R = TemplateFile[]> {
  config: C;
  linkOptions: L | null = null;

  constructor(config: C) {
    this.config = config;
    this._parseLinkOptions();
  }

  generate(): R {
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
