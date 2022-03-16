module.exports = {
  default: { books: [] },
  events: [ 'gifted', 'retired', 'loaned', 'returned' ],
  on: async (toolbox, view, event) => {
    const { db } = toolbox

    const index = view.books.findIndex(book => book.id === event.meta.stream)
    let book = index !== -1 ? view.books[index] : { ...event.data, status: event.meta.type, id: event.meta.stream }

    book.status = event.meta.type
    if (event.meta.type === 'gifted' || event.meta.type === 'returned') {
      book.status = 'available'
    }

    if (event.meta.type === 'loaned') {
      book.customer = event.data.customer
    }

    if (event.meta.type === 'returned') {
      delete book.customer
    }

    if (index !== -1) {
      view.books[index] = book
    }
    else {
      view.books.push(book)
    }

    return view
  },
  get: async (toolbox, view, options) => {
    let filtered_view = { ...view } // TODO: pass a copy into get()
    if (options.q) filtered_view.books = filtered_view.books.filter(book => book.abstract.includes(options.q))
    return filtered_view
  }
}
