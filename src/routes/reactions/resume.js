module.exports = {
  method: 'post',
  path: '/reactions/resume',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    db.reactions.resume(req.query.name)
    res.status(200).end()
  }
}
