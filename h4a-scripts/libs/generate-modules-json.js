const prettier = require("prettier");
const { writeFileSync } = require("fs");
const path = require("path");

/**
 * Configure Next.js app to use the modules
 * @param {any[]} modules
 */
const configureModulesJson = (modules) => {
  const modulesFile = path.join("h4a.modules.json");
  writeFileSync(modulesFile, prettier.format(JSON.stringify(Object.keys(modules)), { parser: "json" }));
}

module.exports = configureModulesJson;
