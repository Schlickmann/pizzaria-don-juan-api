require('dotenv').config()
const express = require('express')
var cors = require('cors')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
  }

  routes () {
    // make the server use the routes defined in routes.js
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
