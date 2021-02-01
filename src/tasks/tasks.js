const { appRoot } = require('../appRoot')
const { isObj } = require('@keg-hub/jsutils')
const { getFolders, requireFile } = require('../fileSys')

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
 * Searches the root application for a tasks folder, and requires it's index
 * @function
 * @private
 *
 * @returns {Object} Found tasks
 */
const searchForTasks = async () => {
  const [ taskFolder ] = await getFolders(appRoot, { include: ['tasks'], full: true })
  return taskFolder && requireFile(taskFolder, 'index.js', true)
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
