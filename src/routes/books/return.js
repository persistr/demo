module.exports = {
  method: 'post',
  path: '/books/:book/return',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    let book = await db.objects.get(req.params.book)
    const event = await book.return(req.body)
    res.status(200).json(event)
  }
}
