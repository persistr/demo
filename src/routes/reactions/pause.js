module.exports = {
  method: 'post',
  path: '/reactions/pause',
  handler: async (toolbox, req, res) => {
    const { db } = toolbox
    db.reactions.pause(req.query.name)
    res.status(200).end()
  }
}
