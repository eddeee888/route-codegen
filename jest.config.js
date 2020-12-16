module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  roots: ["<rootDir>/packages"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
