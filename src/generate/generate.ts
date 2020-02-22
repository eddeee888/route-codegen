import { Config } from './config';
import generateExternalRoutesConfig from './generateExternalRoutesConfig';
import generateAppRoutes from './generateAppRoutes';

function generate(config: Config): void {
  // TODO: make this async maybe

  const { apps } = config;
  Object.values(apps).forEach(generateAppRoutes);

  const otherApps = generateExternalRoutesConfig(apps);
  Object.values(otherApps).forEach(generateAppRoutes);
}

export default generate;
