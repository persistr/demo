module.exports = {
  events: [ 'gifted', 'retired' ],
  on: async (toolbox, view, event) => {
    const { docs } = toolbox

    // Get the book, or create one if it doesn't already exist.
    let book = await docs('books').read({ id: event.meta.stream })
    if (!book) book = { ...event.data, id: event.meta.stream }

    // Mark the book as retired.
    book.retired = (event.meta.type === 'retired')

    // Write the book to the collection.
    await docs('books').write(book)
  },
  get: async (toolbox, view, options) => {
    const { docs } = toolbox

    // Set paging defaults.
    if (!options.page_size) options.page_size = 2
    if (!options.page_num) options.page_num = 1

    // Return matching books at the given page.
    const skip = options.page_size * (options.page_num - 1)
    const books = await docs('books').find({ retired: true }, { skip, limit: options.page_size })

    // TODO: Sorting is not working just yet.
    //const books = await docs('books').find({ retired: true }, { skip, limit: options.page_size, sort: 'name' })
    //const books = await docs('books').find({ retired: true }, { skip, limit: options.page_size, sort: { by: 'name', order: 'asc' }})
    //const books = await docs('books').find({ retired: true }, { skip, limit: options.page_size, sort: [ 'author', { by: 'name', order: 'asc' } ]})

    return { books }
  }
}
