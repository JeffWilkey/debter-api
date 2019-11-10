require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const { DATABASE_URL, PORT } = require('./config')
const indexRouter = require('./routes/index')
const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server

function runServer (databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, err => {
      if (err) {
        return reject(err)
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`)
        resolve()
      })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

function closeServer () {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err))
}

module.exports = { app, runServer, closeServer }
