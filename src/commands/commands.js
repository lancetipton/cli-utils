const { appRoot } = require('../appRoot')
const { isArr } = require('@keg-hub/jsutils')
const { spawnCmd } = require('@keg-hub/spawn-cmd')

const ensureArray = data => (isArr(data) ? data : data.split(' '))

const runCmd = (cmd, args, env = {}) => {
  return spawnCmd(cmd, {
    args,
    options: { env: { ...process.env, ...env } },
    cwd: appRoot,
  })
}

const cmdShortcut = (name, args, ...opts) =>
  runCmd(name, ensureArray(args), ...opts)

const npm = (...args) => cmdShortcut(`npm`, ...args)
const npx = (...args) => cmdShortcut(`npx`, ...args)
const yarn = (...args) => cmdShortcut(`yarn`, ...args)
const docker = (...args) => cmdShortcut(`docker`, ...args)
const dockerComp = (...args) => cmdShortcut(`docker-compose`, ...args)

/**
 *
 * @param {String} containerName - name of container to run command within
 * @param {Array<string>} args - docker exec args
 * @param  {...any} opts - docker exec opts
 * @example
 * dockerExec('<container-name>', 'yarn install')
 */
const dockerExec = (containerName, args, ...opts) => {
  const allArgs = [ 'exec', '-it', containerName, ...ensureArray(args) ]
  return runCmd('docker', allArgs, ...opts)
}

module.exports = {
  npm,
  npx,
  runCmd,
  yarn,
  spawnCmd,
  docker,
  dockerComp,
  dockerExec,
}
