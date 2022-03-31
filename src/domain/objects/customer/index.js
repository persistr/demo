const commands = {
  signup: require('./commands/signup'),
  invoice: require('./commands/invoice'),
  pay: require('./commands/pay')
}

module.exports = {
  commands: [ 'signup', 'invoice', 'pay' ],
  do: async (toolbox, book, command, data) => {
    const cmd = commands[command]
    if (!cmd) throw new Error(`Unknown command '${command}'`)
    const event = cmd.do(toolbox, book, command, data)
    if (!event) throw new Error(`Can't execute command`)
    return event
  },

  events: [ 'signedup', 'invoiced', 'paid' ],
  on: async (toolbox, customer, event) => {
    const { db } = toolbox

    // When a customer signs up, they have an initial balance of $0.
    if (event.meta.type === 'signedup') {
      customer.balance = 0
    }

    // When a customer is invoiced, add the invoice amount to their balance.
    if (event.meta.type === 'invoiced') {
      customer.balance = (customer?.balance ?? 0) + event.data.amount
    }

    // When a customer has paid, subtract the payment amount from their balance.
    if (event.meta.type === 'paid') {
      customer.balance = (customer?.balance ?? 0) - event.data.amount
    }

    return customer
  }
}
