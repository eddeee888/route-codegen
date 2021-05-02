import { throwError } from "../throwError";
import { PatternPluginBaseConfig, PatternTemplateFile, WithExtraConfig } from "../types";

export class BasePatternGenerator<C = Record<string, unknown>> {
  config: WithExtraConfig<PatternPluginBaseConfig, C>;

  constructor(config: WithExtraConfig<PatternPluginBaseConfig, C>) {
    this.config = config;
  }

  generate(): PatternTemplateFile {
    return throwError([], "Implement generate function");
  }
}
