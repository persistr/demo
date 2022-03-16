module.exports = {
  method: 'get',
  path: '/books',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    const view = await db.views.get(`books.${req.query.status || 'all'}`, req.query)
    res.status(200).json(view)
  }
}
