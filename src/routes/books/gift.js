module.exports = {
  method: 'post',
  path: '/books/gift',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let book = await db.objects.create('book')
    const event = await book.gift(req.body)
    res.status(201).location(`/books/${book.id}`).json(event)
  }
}
