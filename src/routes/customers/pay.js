module.exports = {
  method: 'post',
  path: '/customers/:customer/pay',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let customer = await db.objects.get(req.params.customer)
    const event = await customer.pay(req.body)
    res.status(200).json(event)
  }
}
