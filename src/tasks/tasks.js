let __TASK_DEFINITIONS = {}

const registerTasks = tasks => {
  Object.assign(__TASK_DEFINITIONS, tasks)
}

const getTaskDefinitions = () => __TASK_DEFINITIONS

module.exports = {
  getTaskDefinitions,
  registerTasks,
}
