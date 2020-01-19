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
            destinationDir: 'src/accounts/routes',
        },
        contests: {
            routes: { contest: '/contests/:contestId', entries: '/contests/:contestId/entries/:entryId?' },
            destinationDir: 'src/contests/routes',
        },
        projects: {
            routes: { project: '/projects/:projectId/:tab(overview|activity|files|payment)' },
            destinationDir: 'src/projects/routes',
        },
    },
};

function generate(config: Config): void {}
