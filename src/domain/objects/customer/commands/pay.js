const paid = require('../events/paid')
module.exports = {
  do: async (toolbox, customer, command, data) => {
    if (command !== 'pay') return
    if (command === 'pay' && customer.balance <= 0) throw new Error(`Can only pay overdue balance if there is one`)
    if (command === 'pay' && !data.amount) throw new Error(`Must specify amount to pay`)

    console.log(`Processing payment...`)
    await new Promise(r => setTimeout(r, 2000))
    console.log('... completed.')

    return paid(data.amount)
  }
}
