module.exports = {
  method: 'post',
  path: '/views/resume',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    db.views.resume(req.query.name)
    res.status(200).end()
  }
}
