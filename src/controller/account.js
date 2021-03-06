import mongoose from 'mongoose'
import { Router } from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'

import Account from '../model/account'
import config from '../config'

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
  let api = Router()

  // '/v1/account'
  api.post('/register', (req, res) => {
    Account.register(new Account({
      username: req.body.email
    }), req.body.password, function(err, account){
      if(err){
        res.send(err)
      } else {
        passport.authenticate('local', {
          session: false //We are going to use clients not sessions
        })(req, res, () => {
          res.status(200).send('Sucessfully created new account')
        })
      }
    })
  })

  // '/v1/account/login'
  api.post('/login', passport.authenticate('local', {
    session: false,
    scope: []
  }), generateAccessToken, respond)

  // '/v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout()
    res.status(200).send('Sucessfully logged out')
  })

  // '/v1/account/me'
  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user)
  })

  return api
}
