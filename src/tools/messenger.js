module.exports = {
  send: async package => {
    const { to, message } = package
    console.log(`Delivery for ${to}:\n${message}`)
    await new Promise(r => setTimeout(r, 2000))
    console.log('... delivered.')
  }
}
