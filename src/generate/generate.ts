import { Config } from './config';
import generateExternalRoutesConfig from './generateExternalRoutesConfig';
import processAppConfig from './../generate/processAppConfig';

function generate(config: Config): void {
  // TODO: make this async maybe

  const { apps } = config;
  Object.values(apps).forEach(processAppConfig);

  const otherApps = generateExternalRoutesConfig(apps);
  Object.values(otherApps).forEach(processAppConfig);
}

export default generate;
