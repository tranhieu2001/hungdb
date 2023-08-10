const { default: mongoose } = require('mongoose')

const URI = 'mongodb://127.0.0.1/datatest'

async function connect() {
  try {
    await mongoose.connect(URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}

module.exports = connect
