"use strict";
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");
const dmd = require("dmd");

const pluginsRootDir = [__dirname, "..", "..", "packages", "core", "src", "plugins"];
const pluginModules = fs.readdirSync(path.join(...pluginsRootDir));

const plugins = pluginModules.map((pluginName) => ({
  pathArray: [...pluginsRootDir, pluginName],
  pluginName,
}));

plugins.forEach(({ pathArray, pluginName }) => {
  const files = path.join(...[...pathArray, "**", "*.ts"]);

  jsdoc2md.getJsdocData({ files: files, configure: "./jsdoc2md.json" });

  const templateData = jsdoc2md.getTemplateDataSync({ files: files });
  const output = dmd(templateData);

  fs.writeFileSync(path.join(...[...pathArray, `${pluginName}.md`]), output);
});
