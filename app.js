// app.js
const express = require('express')
const { create } = require('express-handlebars')
const bodyParser = require('body-parser')

const connect = require('./config/db')
const controllers = require('./controllers')

const app = express()
const PORT = 3000

const hbs = create({
  helpers: {
    imageToString: function (image) {
      if (!image) {
        return ''
      }
      const imageString = image.toString('base64')
      return imageString
    },
  },
  extname: '.hbs',
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', './views')

connect()
controllers(app)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
