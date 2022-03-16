module.exports = {
  method: 'post',
  path: '/books/:book/retire',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let book = await db.objects.get(req.params.book)
    const event = await book.retire()
    res.status(200).json(event)
  }
}
