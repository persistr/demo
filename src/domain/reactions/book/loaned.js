module.exports = {
  context: { reminders: {} },

  events: [ 'loaned' ],
  on: async (toolbox, context, event) => {
    const { messenger } = toolbox

    // When a book is loaned, inform the customer when the book is due back.
    if (event.meta.type === 'loaned') {
      await messenger.send({ to: event.data.customer, message: 'Reminder that your book is due back in 5 days' })

      // Remember that the customer was notified of the due date for this book.
      const bookID = event.meta.stream
      context.reminders[ bookID ] = (new Date()).toISOString()
    }
  }
}
