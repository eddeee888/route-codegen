#!/usr/bin/env node

import yargs from "yargs";
import generate from "./../generate";
import yaml from "js-yaml";
import { readFileSync } from "fs";
import { log } from "util";

const argv = yargs.options({
  config: { type: "string", default: "route-codegen.yml" },
  stacktrace: { type: "boolean", default: false },
  verbose: { type: "boolean", default: false },
}).argv;

const { config, stacktrace, verbose } = argv;

try {
  console.log("route-codegen START!");
  let ymlContent = readFileSync(config, "utf8");

  // Allow passing variables by replacing ${...} with its correspondent value in process.env
  if (typeof process !== "undefined" && "env" in process) {
    ymlContent = ymlContent.replace(/\$\{(.*)\}/g, (str, variable) => {
      log(`Replacing \${${variable}} with ${process.env[variable]}`);
      return process.env[variable] ?? "";
    });
  }

  const configContent = yaml.load(ymlContent);
  if (!configContent) {
    throw new Error("Unable to load route-codegen config");
  }

  if (typeof configContent === "string" || typeof configContent === "number") {
    throw new Error("route-codegen config is invalid");
  }

  generate(configContent as any, { verbose });
  console.log("route-codegen END!");
} catch (e) {
  if (stacktrace) {
    console.log(e);
  } else {
    console.log(e.message);
  }
  process.exit(1);
}
