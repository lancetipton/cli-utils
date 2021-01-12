const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { isArr } = require('@keg-hub/jsutils')
const { tapRoot } = require('./tapRoot')

const ensureArray = data => isArr(data) ? data : data.split(' ')

const runCmd = (cmd, args, env={}) => {
  return spawnCmd(cmd, {
    args,
    options: { env: { ...process.env, ...env } },
    cwd: tapRoot
  })
}

const npm = (args, ...opts) => runCmd(`npm`, ensureArray(args), ...opts)
const npx = (args, ...opts) => runCmd(`npx`, ensureArray(args), ...opts)
const yarn = (args, ...opts) => runCmd(`yarn`, ensureArray(args), ...opts)

module.exports = {
  npm,
  npx,
  runCmd,
  yarn,
  spawnCmd
}