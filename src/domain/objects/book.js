module.exports = {
  commands: [ 'gift', 'retire', 'loan', 'return' ],
  do: async (toolbox, book, command, data) => {
    // Valid commands.
    if (command === 'gift' && book.status === undefined) return { meta: { type: 'gifted' }, data }
    if (command === 'retire' && book.status === 'available') return { meta: { type: 'retired' }}
    if (command === 'loan' && book.status === 'available') return { meta: { type: 'loaned' }, data }
    if (command === 'return' && book.status === 'loaned' && data.customer === book.customer) return { meta: { type: 'returned' }}

    // Invalid commands.
    if (command === 'retire' && book.status !== 'available') throw new Error(`Can't retire a book that's currently loaned to a customer`)
    if (command === 'return' && book.status === 'loaned' && data.customer !== book.customer) throw new Error(`Customer ${data.customer} can't return a book they didn't loan`)
    throw new Error(`Can't execute command`) // all others invalid by default
  },

  events: [ 'gifted', 'retired', 'loaned', 'returned' ],
  on: async (toolbox, book, event) => {
    const { db } = toolbox

    // Set book status. Books are either available to be loaned out, currently
    // loaned out to someone, or retired from the library.
    book.status = event.meta.type
    if (event.meta.type === 'gifted' || event.meta.type === 'returned') {
      book.status = 'available'
    }

    // When a book is gifted, remember the book name and the author name.
    if (event.meta.type === 'gifted') {
      book.name = event.data.name
      book.author = event.data.author
    }

    // When a book is loaned out, remember which customer has the book.
    if (event.meta.type === 'loaned') {
      book.customer = event.data.customer
    }

    // When a book is returned, forget about who had it loaned out previously.
    if (event.meta.type === 'returned') {
      delete book.customer
    }

    return book
  }
}
