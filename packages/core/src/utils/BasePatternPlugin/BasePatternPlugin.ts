import { throwError } from "../throwError";
import { PatternNamedExports, RoutingType, TemplateFile } from "../types";

export interface BasePatternPluginConfig {
  origin: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  linkOptionModeNextJS: "strict" | "loose";
}

export type BasePatternPluginResult = [TemplateFile, PatternNamedExports];

export class BasePatternPlugin<C = BasePatternPluginConfig, R = BasePatternPluginResult> {
  config: C;

  constructor(config: C) {
    this.config = config;
  }

  generate(): R {
    return throwError([], "Implement generate function");
  }
}
