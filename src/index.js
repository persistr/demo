// Dependencies.
const bodyParser = require('body-parser')
const collection = require('tingodb-promise')
const path = require('path')
const { persistr } = require('@persistr/js')
const { builder } = require('@persistr/microservice')
const pkg = require('../package.json')

async function main () {
  // Connect to Persistr.
  const { db } = await persistr.connect()

  // Register domain objects and views with a custom set of tools.
  await db.domain({ folder: path.resolve(__dirname, 'domain'), tools: { collection: collection('books') }})

  // Configure a web service.
  const service = builder
    .name(pkg.name)
    .version(pkg.version)
    .router(router => router.use(bodyParser.json({ type: 'application/json' })))
    .toolbox({ db, collection: collection('books') })
    .routes({ folder: path.resolve(__dirname, 'routes') })
    .errors((res, error) => {
      console.error(error.message + '\t' + error.stack)
      res.status(500).json({ error: 'Internal service error', internal: error.message, stack: error.stack })
    })
    .build()

  // Run the web service.
  service.run(process.env.PORT || 8080)

  // Graceful shutdown.
  const shutdown = async () => {
    // Close database.
    await db.close()

    // Exit process.
    process.exit(0)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

// Run server and catch any errors.
async function run(f) { try { await f() } catch (error) { console.error(error.message) }}
run(main)
