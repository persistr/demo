const invoiced = require('../events/invoiced')
module.exports = {
  do: async (toolbox, customer, command, data) => {
    if (command !== 'invoice') return
    if (command === 'invoice' && !data.amount) throw new Error(`Must specify amount to invoice`)

    console.log(`Generating invoice...`)
    await new Promise(r => setTimeout(r, 2000))
    console.log('... completed.')

    return invoiced(data.amount)
  }
}
