module.exports = {
  method: 'post',
  path: '/customers/:customer/invoice',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let customer = await db.objects.get(req.params.customer)
    const event = await customer.invoice(req.body)
    res.status(200).json(event)
  }
}
