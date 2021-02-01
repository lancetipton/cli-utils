const path = require('path')
const appPath = require('app-root-path').path
const cliUtilsRoot = path.join(__dirname, '../').slice(0, -1)

/**
 * Recursively finds the root parent module, and returns its directory path
 * @function
 * @private
 * @param {Object} parentModule - parent module of the caller
 *
 * @returns {string} Found root path of the root parent module
 */
const getRootParentModule = parentModule => {
  return parentModule.parent
    ? getRootParentModule(parentModule.parent)
    : path.dirname(parentModule.path)
}

/**
 * Gets the root apps path, even when the keg-cli-utils is symlinked
 * @function
 * @private
 *
 * @returns {string} Found root path of the calling application
 */
const getRootPath = () => {
  return cliUtilsRoot === appPath
    ? getRootParentModule(module.parent)
    : appPath
}

module.exports = {
  appRoot: getRootPath(),
}
