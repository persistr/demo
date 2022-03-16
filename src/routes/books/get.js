module.exports = {
  method: 'get',
  path: '/books/:book',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    const book = await db.objects.get(req.params.book, { plain: true })
    res.status(200).json(book)
  }
}
