const error = require('./error')
const fileSys = require('./fileSys')
const commands = require('./commands')
const { Logger } = require('./logger')
const { runTask } = require('./runTask')
const { tapRoot } = require('./tapRoot')
const { constants } = require('./constants')
const { registerTasks } = require('./tasks/tasks')
const {
  getKegGlobalConfig,
  findTask,
  sharedOptions,
  setSharedOptions,
} = require('./task')

module.exports = {
  commands,
  constants,
  getKegGlobalConfig,
  findTask,
  fileSys,
  error,
  Logger,
  registerTasks,
  runTask,
  sharedOptions,
  setSharedOptions,
  tapRoot,
}
