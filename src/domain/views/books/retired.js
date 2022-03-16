module.exports = {
  events: [ 'gifted', 'retired' ],
  on: async (toolbox, view, event) => {
    const { collection } = toolbox

    // Get the book, or create one if it doesn't already exist.
    let book = await collection.findOne({ id: event.meta.stream })
    if (!book) book = { ...event.data, id: event.meta.stream }

    // Mark the book as retired.
    book.retired = (event.meta.type === 'retired')

    // Update (or insert) the book in the collection.
    await collection.update({ id: event.meta.stream }, book, { upsert: true })
  },
  get: async (toolbox, view, options) => {
    const { collection } = toolbox

    // Set paging defaults.
    if (!options.page_size) options.page_size = 2
    if (!options.page_num) options.page_num = 1

    // Return matching books at the given page.
    const skips = options.page_size * (options.page_num - 1)
    const books = await collection.find({ retired: true }, { skip: Number(skips), limit: Number(options.page_size) }).toArray()
    return { books }
  }
}
