module.exports = {
  method: 'post',
  path: '/customers/signup',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let customer = await db.objects.create('customer')
    const event = await customer.signup(req.body)
    res.status(201).location(`/customers/${customer.id}`).json(event)
  }
}
