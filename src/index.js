// Set env vars.
process.env.PERSISTR_SERVER_SECRET = ''

// Dependencies.
const bodyParser = require('body-parser')
const collection = require('tingodb-promise')
const path = require('path')
const { persistr } = require('@persistr/js')
const { builder } = require('@persistr/microservice')
const pkg = require('../package.json')

// Tools.
const messenger = require('./tools/messenger')

async function main () {
  // Connect to Persistr.
  const cxn = await persistr.connect()

  // This will connect you to a fully self-contained Persistr stack running in memory.
  // In addition to in-memory, you can also store data to SQLite3.

  // Use SQLite with a database file 'mydb.sqlite' in the current working folder:
  // const cxn = await persistr.connect('sqlite3:mydb.sqlite')

  // Use SQLite with an absolute path '/Users/user/mydb.sqlite':
  // const cxn = await persistr.connect('sqlite3:/Users/user/mydb.sqlite')

  // Create demo account and database (if they don't already exist).
  const account = await cxn.account({ username: 'demo' }).createIfNotExists({ password: 'demo' })
  const db = await account.db('demo').createIfNotExists()

  // Register domain objects, views, and reactions with a custom set of tools.
  await db.domain({ folder: path.resolve(__dirname, 'domain'), tools: { collection: collection('books'), messenger }})

  // Alternatively, you can pass in your domain objects, views, and reactions.
  /*
  await db.domain({
    tools: { collection: collection('books'), messenger },
    objects: {
      book: require('./domain/objects/book'),
      customer: require('./domain/objects/customer')
    },
    reactions: {
      'book.loaned': require('./domain/reactions/book/loaned')
    },
    views: {
      'books.all': require('./domain/views/books/all'),
      'books.available': require('./domain/views/books/available'),
      'books.loaned': require('./domain/views/books/loaned'),
      'books.retired': require('./domain/views/books/retired')
    }
  })
  */

  // Configure a web service.
  const service = builder
    .name(pkg.name)
    .version(pkg.version)
    .router(router => router.use(bodyParser.json({ type: 'application/json' })))
    .toolbox({ db, collection: collection('books') })
    .routes({ folder: path.resolve(__dirname, 'routes') })
    .errors((res, error) => {
      console.error(`Error: ${error.message}`)
      res.status(500).json({ error: 'Internal service error', message: error.message })
    })
    .build()

  // Run the web service.
  service.run(process.env.PORT || 8080)

  // Graceful shutdown.
  const shutdown = async () => {
    // Close database.
    await db.connection.close()

    // Exit process.
    process.exit(0)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

// Run server and catch any errors.
async function run(f) { try { await f() } catch (error) { console.error(error.message) }}
run(main)
