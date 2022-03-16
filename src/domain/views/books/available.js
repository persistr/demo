module.exports = {
  extends: 'books.all',
  get: async (toolbox, view, options) => {
    let filtered_view = { ...view }
    if (options.q) filtered_view.books = filtered_view.books.filter(book => book.abstract.includes(options.q))
    filtered_view.books = filtered_view.books.filter(book => book.status === 'available')
    return filtered_view
  }
}
