const signedup = require('../events/signedup')
module.exports = {
  do: async (toolbox, customer, command, data) => {
    if (command !== 'signup') return
    if (command === 'signup' && !data.name) throw new Error(`Customer must have a name`)
    return signedup(data.name)
  }
}
