const fs = require("fs");
const path = require("path");

/**
 * Returns a list of modules under a given path
 * @param basePath
 * @returns {any[]}
 */
const getModulesList = (basePath) => {
  const modules = fs.readdirSync(basePath, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

  return modules.reduce((acc, modulePath) => {
    const moduleFullPath = path.join(basePath, modulePath);
    const packageJsonFile = path.join(moduleFullPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, "utf8"));
    const { name } = packageJson;

    acc[name] = moduleFullPath;
    return acc;
  }, {});
};

module.exports = getModulesList;
