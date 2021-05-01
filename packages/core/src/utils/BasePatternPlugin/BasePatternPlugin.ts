import { throwError } from "../throwError";
import { PatternNamedExports, TemplateFile } from "../types";

export interface BasePatternPluginConfig {
  origin: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;

  linkOptionModeNextJS: "strict" | "loose" | undefined; // TODO: this is a hack and should be removed
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
