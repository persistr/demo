module.exports = {
  method: 'post',
  path: '/views/refresh',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    db.views.refresh(req.query.name)
    res.status(200).end()
  }
}
