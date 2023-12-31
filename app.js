// app.js
const express = require('express')

const { create } = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')

const connect = require('./config/db')
const route = require('./routes')

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
    ifEqual: function (a, b, options) {
      if (a === b) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
  },
  extname: '.hbs',
})

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(methodOverride('_method'))

connect()
route(app)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
