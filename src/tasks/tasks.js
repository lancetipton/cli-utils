const path = require('path')
const { isObj } = require('@keg-hub/jsutils')
const { getFolders, requireFile } = require('../fileSys')
const appPath = require('app-root-path').path
const utilsRoot = path.join(__dirname, '../../').slice(0, -1)

/**
 * Task Definition cache
 * @Object
 */
let __TASK_DEFINITIONS = {}

/**
 * Registers tasks with the __TASK_DEFINITIONS cache
 * @function
 * @export
 * @public
 * @param {Object} tasks - Custom tasks to register with with CLI
 *
 * @returns {void}
 */
const registerTasks = tasks => {
  Object.assign(__TASK_DEFINITIONS, tasks)
}

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
  return utilsRoot === appPath
    ? getRootParentModule(module.parent)
    : appPath
}

/**
 * Searches the root application for a tasks folder, and requires it's index
 * @function
 * @private
 *
 * @returns {Object} Found tasks
 */
const searchForTasks = async () => {
  const rootPath = getRootPath()
  const [ taskFolder ] = await getFolders(rootPath, { include: ['tasks'], full: true })

  return taskFolder && requireFile(taskFolder)
}

/**
 * Gets all task definitions, and joins them as a single object
 * <br/>Registers them with the cached __TASK_DEFINITIONS object
 * @function
 * @public
 * @export
 * @param {Object} - customTasks - task store in cache
 *
 * @returns {Object} __TASK_DEFINITIONS - cached task definitions
 */
const getTaskDefinitions = async (customTasks) => {
  isObj(customTasks) && registerTasks(customTasks)

  const { data:dynamicTasks } = await searchForTasks()

  dynamicTasks && registerTasks(dynamicTasks)

  return __TASK_DEFINITIONS
}

module.exports = {
  getTaskDefinitions,
  registerTasks,
}
