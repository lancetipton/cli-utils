const {
  deepMerge,
  isArr,
  noOpObj,
  noOpArr,
  pickKeys,
} = require('@keg-hub/jsutils')

let __SHARED_OPTS = {}

/**
 * Sets the shared options object, to allow reusing defined task options
 * @function
 * @export
 * @param {Object} options - Task options that can be shared across tasks
 *
 * @example
 * sharedOptions({ ...custom task options })
 *
 * @returns {void}
 */
const setSharedOptions = (options = noOpObj) => {
  Object.assign(__SHARED_OPTS, options)
}

/**
 * Gets the options to launch the Playwright browser based on passed in options and config settings
 * @function
 * @private
 * @param {string} action - Name of the task action getting the options
 * @param {Object} taskOps - Task options defined in the task
 * @param {Array} include - Filter to include shared options by name
 *
 * @example
 * sharedOptions('start') // Returns all shared options
 *
 * @returns {Object} - Merged task options and shared options
 */
const sharedOptions = (action, taskOps = noOpObj, include = noOpArr) => {
  const addOpts = isArr(include) ? pickKeys(__SHARED_OPTS, include) : options

  // taskOps is merged twice to ensure key order, then priority
  return deepMerge(taskOps, addOpts, taskOps)
}

module.exports = {
  sharedOptions,
  setSharedOptions,
}
