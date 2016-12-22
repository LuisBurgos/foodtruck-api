import http from 'http' /*import looks for a index.js file on a folder*/
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'

import config from './config'
import routes from './routes'

const LocalStrategy = require('passport-local').Strategy

let app = express()
app.server = http.createServer(app)

// Middleware
// Parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// Passport Config
app.use(passport.initialize())
let Account = require('./model/account')
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

// API Routes v1
app.use('/v1', routes)

app.server.listen(config.port)
console.log(`Started on port ${app.server.address().port}`);

export default app /*This works with import, we can not use with require*/
