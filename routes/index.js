const homeRouter = require('./home')
const formRouter = require('./form')
const dataRouter = require('./data')

function route(app) {
  app.use('/', homeRouter)
  app.use('/form', formRouter)
  app.use('/data', dataRouter)
}

module.exports = route
