module.exports = {
  extends: 'books.all',
  get: async (toolbox, view, options) => {
    return { books: view.books.filter(book => book.status === 'loaned') }
  }
}
