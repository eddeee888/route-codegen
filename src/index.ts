import { pathToRegexp, Key } from 'path-to-regexp';
import { writeFile, mkdirSync } from 'fs';

interface AppConfig {
  routes: Record<string, string>;
  destinationDir: string;
}

interface Config {
  apps: Record<string, AppConfig>;
}

const config: Config = {
  apps: {
    accounts: {
      routes: { user: '/users/:id' },
      destinationDir: 'tests/accounts/routes',
    },
    contests: {
      routes: { contest: '/contests/:contestId', entries: '/contests/:contestId/entries/:entryId?' },
      destinationDir: 'tests/contests/routes',
    },
    projects: {
      routes: { project: '/projects/:projectId/:tab(overview|activity|files|payments)?' },
      destinationDir: 'tests/projects/routes',
    },
  },
};

// TODO: fix this hacky compare
const NORMAL_PATTERN = '[^\\/#\\?]+?';
function isNormalPattern(pattern: string): boolean {
  return pattern === NORMAL_PATTERN;
}

function generate(config: Config): void {
  const { apps } = config;

  Object.values(apps).forEach(app => {
    const { destinationDir, routes } = app;
    Object.entries(routes).forEach(([routeName, routePattern]) => {
      const keys: Key[] = [];
      const routeNameString = routeName.toString();
      const displayRouteName = `RouteTo${routeNameString[0].toUpperCase() + routeNameString.slice(1)}`;

      pathToRegexp(routePattern, keys);

      let template = '/* This file was automatically generated and should not be edited. */\n\n';
      template += `interface ${displayRouteName} {\n`;
      keys.forEach(key => {
        const { pattern, name, modifier } = key;
        if (isNormalPattern(pattern)) {
          template += `${name}${modifier === '?' ? modifier : ''}: string;\n`;
        } else {
          // Note: We are using enum here... this may not be safe
          const enumArray = pattern.split('|');
          if (enumArray.length > 0) {
            template += `${name}${modifier === '?' ? modifier : ''}:`;
            enumArray.forEach(enumValue => (template += `'${enumValue}'|`));
            // Remove last '|'
            template = template.slice(0, -1);
            template += `;\n`;
          }
        }
      });
      template += '}\n';

      mkdirSync(destinationDir, { recursive: true });

      writeFile(destinationDir.concat('/', displayRouteName, '.ts'), template, err => {
        if (err) {
          throw err;
        }
        console.log('Successfully generated fixtures!');
      });
    });
  });
}

generate(config);
