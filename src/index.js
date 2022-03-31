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
  const { db } = await persistr.connect()

  // Register domain objects, views, and reactions with a custom set of tools.
  await db.domain({ folder: path.resolve(__dirname, 'domain'), tools: { collection: collection('books'), messenger }})

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
