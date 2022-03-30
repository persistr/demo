module.exports = {
  method: 'post',
  path: '/views/pause',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    db.views.pause(req.query.name)
    res.status(200).end()
  }
}
