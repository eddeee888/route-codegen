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

export class BasePlugin<L = any, C = BasePluginConfig, R = TemplateFile[]> {
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
    return throwError([], "Implement _parseLinkOptions function");
  }

  protected _getLinkOptions(): L {
    return throwError([], "Implement _getLinkOptions function");
  }
}
