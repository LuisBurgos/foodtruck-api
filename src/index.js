import http from 'http' /*import looks for a index.js file on a folder*/
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import config from './config'
import routes from './routes'

let app = express()
app.server = http.createServer(app)

// Middleware
// Parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// Passport Config

// API Routes v1
app.use('/v1', routes)

app.server.listen(config.port)
console.log(`Started on port ${app.server.address().port}`);

export default app /*This works with import, we can not use with require*/
