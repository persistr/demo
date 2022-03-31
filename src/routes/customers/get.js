module.exports = {
  method: 'get',
  path: '/customers/:customer',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    const customer = await db.objects.get(req.params.customer, { plain: true })
    res.status(200).json(customer)
  }
}
