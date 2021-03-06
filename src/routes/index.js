import express from 'express'
import config from '../config'
import middleware from '../middleware'
import initializeDb from '../db'
import foodtruck from '../controller/foodtruck'
import account from '../controller/account'

let router = express()

// Connect to DB
initializeDb(db => {

  // Internal Middleware, if we have to.
  router.use(middleware({ config, db }))

  // API Routes v1 (/v1)
  router.use('/foodtruck', foodtruck({ config, db }))
  router.use('/account', account({ config, db }))
})

export default router
